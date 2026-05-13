import type {
  MeetingId,
  InviteToken,
  MeetingResponse,
  MeetingRecommendedPlan,
  ResponseId,
  CreateMeetingDraft,
  MeetingRecord,
  InviteLink,
  ConfirmedPlan,
} from '../types/meeting';

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
  confirmPlan(input: ConfirmPlanInput): Promise<ConfirmedPlan>;
  getConfirmedPlan(meetingId: MeetingId): Promise<ConfirmedPlan | null>;
  getMeetingByInvite(meetingId: MeetingId, token: InviteToken): Promise<{ meeting: MeetingRecord; inviteLink: InviteLink } | null>;
}
