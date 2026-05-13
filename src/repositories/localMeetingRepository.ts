import { readJson, writeJson } from './localStorageAdapter';
import type {
  MeetingRepository,
  SubmitGuestResponseInput,
  ConfirmPlanInput,
  SubmitGuestResponseResult,
  CreateMeetingWithInviteLinkResult,
} from './meetingRepository';
import type {
  ConfirmedPlan,
  CreateMeetingDraft,
  InviteLink,
  InviteToken,
  MeetingId,
  MeetingRecord,
  MeetingResponse,
  ResponseId,
  ConfirmedPlanId,
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

export const localMeetingRepository: MeetingRepository = {
  async createMeetingWithInviteLink(draft: CreateMeetingDraft): Promise<CreateMeetingWithInviteLinkResult> {
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

    return { meetingId, inviteToken, inviteUrlPath: `/#/invite/${meetingId}/${inviteToken}` };
  },

  async getMeetingByInvite(meetingId: MeetingId, token: InviteToken) {
    const links = readJson<InviteLink[]>(INVITE_LINKS_KEY, []);
    const link = links.find((l) => l.meetingId === meetingId && l.token === token);
    if (!link || link.isClosed) return null;

    const meetings = readJson<MeetingRecord[]>(MEETINGS_KEY, []);
    const meeting = meetings.find((m) => m.id === meetingId);
    return meeting ? { meeting, inviteLink: link } : null;
  },

  async getMeetingResponses(meetingId: MeetingId): Promise<MeetingResponse[]> {
    const responses = readJson<MeetingResponse[]>(RESPONSES_KEY, []);
    return responses.filter((r) => r.meetingId === meetingId);
  },

  async submitGuestResponse(input: SubmitGuestResponseInput): Promise<SubmitGuestResponseResult> {
    const responses = readJson<MeetingResponse[]>(RESPONSES_KEY, []);
    const existing = responses.find(
      (response) => response.idempotencyKey === input.idempotencyKey
    );

    if (existing) {
      return {
        responseId: existing.id as ResponseId,
        saved: false,
      };
    }

    const id = createId('r') as ResponseId;
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

    writeJson(RESPONSES_KEY, [...responses, response]);
    return { responseId: id, saved: true };
  },

  async confirmPlan(input: ConfirmPlanInput): Promise<ConfirmedPlan> {
    const plans = readJson<ConfirmedPlan[]>(CONFIRMED_PLANS_KEY, []);
    const existingIndex = plans.findIndex((plan) => plan.meetingId === input.meetingId);

    const plan: ConfirmedPlan = {
      id: existingIndex >= 0 ? plans[existingIndex].id : (createId('p') as ConfirmedPlanId),
      meetingId: input.meetingId,
      dateLabel: input.selectedPlan.dateLabel,
      timeLabel: input.selectedPlan.timeLabel,
      placeName: input.selectedPlan.placeName,
      activityLabels: input.selectedPlan.activityLabels,
      confirmSource: input.confirmSource,
      reason: input.selectedPlan.reason,
      createdAt: existingIndex >= 0 ? plans[existingIndex].createdAt : now(),
      updatedAt: now(),
    };

    const nextPlans =
      existingIndex >= 0
        ? plans.map((item, index) => (index === existingIndex ? plan : item))
        : [...plans, plan];

    writeJson(CONFIRMED_PLANS_KEY, nextPlans);

    const meetings = readJson<MeetingRecord[]>(MEETINGS_KEY, []);
    const meetingIndex = meetings.findIndex((m) => m.id === input.meetingId);
    if (meetingIndex > -1) {
      meetings[meetingIndex].status = 'confirmed';
      writeJson(MEETINGS_KEY, meetings);
    }
    return plan;
  },

  async getConfirmedPlan(meetingId: MeetingId): Promise<ConfirmedPlan | null> {
    const plans = readJson<ConfirmedPlan[]>(CONFIRMED_PLANS_KEY, []);
    return plans.find((p) => p.meetingId === meetingId) || null;
  },

  async getMeetingById(meetingId: MeetingId): Promise<MeetingRecord | null> {
    const meetings = readJson<MeetingRecord[]>(MEETINGS_KEY, []);
    return meetings.find((meeting) => meeting.id === meetingId) || null;
  },
};
