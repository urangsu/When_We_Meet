import type {
  MeetingId,
  InviteToken,
  MeetingResponse,
  MeetingRecommendedPlan,
  ResponseId,
  CreateMeetingDraft,
} from '../types/meeting';
import { mockResponses } from '../data/mockResponses';

export interface SubmitGuestResponseInput {
  meetingId: MeetingId;
  inviteToken: InviteToken;
  response: Omit<
    MeetingResponse,
    'id' | 'meetingId' | 'createdAt' | 'updatedAt'
  >;
  idempotencyKey: string;
}

export interface SubmitGuestResponseResult {
  responseId: ResponseId;
  saved: boolean;
}

export interface CreateMeetingWithInviteLinkResult {
  meetingId: MeetingId;
  inviteToken: InviteToken;
  inviteUrlPath: string;
}

export interface ConfirmPlanInput {
  meetingId: MeetingId;
  selectedPlan: MeetingRecommendedPlan;
  confirmSource: 'recommended' | 'manual';
}

export interface MeetingRepository {
  getMeetingResponses(meetingId: MeetingId): Promise<MeetingResponse[]>;
  submitGuestResponse(input: SubmitGuestResponseInput): Promise<SubmitGuestResponseResult>;
  createMeetingWithInviteLink(draft: CreateMeetingDraft): Promise<CreateMeetingWithInviteLinkResult>;
  confirmPlan(input: ConfirmPlanInput): Promise<void>;
}

export const mockMeetingRepository: MeetingRepository = {
  async getMeetingResponses(meetingId) {
    if (meetingId === 'demo') return mockResponses;
    return mockResponses.filter((response) => response.meetingId === meetingId);
  },

  async submitGuestResponse(input) {
    return {
      responseId: `mock-response-${input.idempotencyKey}`,
      saved: true,
    };
  },

  async createMeetingWithInviteLink() {
    return {
      meetingId: 'demo',
      inviteToken: 'demo-token',
      inviteUrlPath: '/invite/demo',
    };
  },

  async confirmPlan() {
    return;
  },
};
