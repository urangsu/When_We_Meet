import { readJson, writeJson } from './localStorageAdapter';
import {
  ConfirmedPlan,
  CreateMeetingDraft,
  InviteLink,
  InviteToken,
  MeetingId,
  MeetingRecord,
  MeetingResponse,
} from '../types/meeting';

const MEETINGS_KEY = 'wwm:meetings:v1';
const INVITE_LINKS_KEY = 'wwm:invite-links:v1';
const RESPONSES_KEY = 'wwm:responses:v1';
const CONFIRMED_PLANS_KEY = 'wwm:confirmed-plans:v1';

const createId = (prefix: string) => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
};

const now = () => new Date().toISOString();

export const localMeetingRepository = {
  async createMeetingWithInviteLink(draft: CreateMeetingDraft) {
    const meetingId = createId('m') as MeetingId;
    const inviteToken = createId('t') as InviteToken;
    const meeting: MeetingRecord = {
      ...draft,
      id: meetingId,
      status: 'collecting',
      createdAt: now(),
      updatedAt: now(),
    };
    const inviteLink: InviteLink = {
      id: createId('i'),
      meetingId,
      token: inviteToken,
      accessMode: 'link_anyone',
      isClosed: false,
      duplicateGuardMode: 'none',
      createdAt: now(),
      updatedAt: now(),
    };

    const meetings = readJson<MeetingRecord[]>(MEETINGS_KEY, []);
    writeJson(MEETINGS_KEY, [...meetings, meeting]);
    const links = readJson<InviteLink[]>(INVITE_LINKS_KEY, []);
    writeJson(INVITE_LINKS_KEY, [...links, inviteLink]);

    return { meeting, inviteLink, inviteUrlPath: `/#/invite/${meetingId}/${inviteToken}` };
  },

  async getMeetingByInvite(meetingId: MeetingId, token: InviteToken) {
    const links = readJson<InviteLink[]>(INVITE_LINKS_KEY, []);
    const link = links.find((l) => l.meetingId === meetingId && l.token === token);
    if (!link || link.isClosed) return null;

    const meetings = readJson<MeetingRecord[]>(MEETINGS_KEY, []);
    const meeting = meetings.find((m) => m.id === meetingId);
    return meeting ? { meeting, inviteLink: link } : null;
  },

  async getMeetingResponses(meetingId: MeetingId) {
    const responses = readJson<MeetingResponse[]>(RESPONSES_KEY, []);
    return responses.filter((r) => r.meetingId === meetingId);
  },

  async submitGuestResponse(input: any) {
    const id = createId('r');
    const response: MeetingResponse = {
      ...input.response,
      id,
      meetingId: input.meetingId,
      inviteToken: input.inviteToken,
      idempotencyKey: input.idempotencyKey,
      createdAt: now(),
      updatedAt: now(),
      source: 'guest_web',
    };
    const responses = readJson<MeetingResponse[]>(RESPONSES_KEY, []);
    writeJson(RESPONSES_KEY, [...responses, response]);
    return { responseId: id, saved: true };
  },

  async confirmPlan(input: any) {
    const plan: ConfirmedPlan = {
      id: createId('p'),
      meetingId: input.meetingId,
      dateLabel: input.selectedPlan.dateLabel,
      timeLabel: input.selectedPlan.timeLabel,
      placeName: input.selectedPlan.placeName,
      activityLabels: input.selectedPlan.activityLabels,
      confirmSource: input.confirmSource,
      createdAt: now(),
      updatedAt: now(),
    };
    const plans = readJson<ConfirmedPlan[]>(CONFIRMED_PLANS_KEY, []);
    writeJson(CONFIRMED_PLANS_KEY, [...plans, plan]);

    const meetings = readJson<MeetingRecord[]>(MEETINGS_KEY, []);
    const meetingIndex = meetings.findIndex((m) => m.id === input.meetingId);
    if (meetingIndex > -1) {
      meetings[meetingIndex].status = 'confirmed';
      writeJson(MEETINGS_KEY, meetings);
    }
    return plan;
  },

  async getConfirmedPlan(meetingId: MeetingId) {
    const plans = readJson<ConfirmedPlan[]>(CONFIRMED_PLANS_KEY, []);
    return plans.find((p) => p.meetingId === meetingId) || null;
  },
};
