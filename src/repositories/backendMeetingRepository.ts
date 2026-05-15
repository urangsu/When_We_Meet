import type {
  ConfirmedPlan,
  InviteToken,
  MeetingId,
  MeetingRecord,
  MeetingResponse,
  InviteLink,
} from '../types/meeting';
import type {
  ConfirmPlanInput,
  CreateMeetingWithInviteLinkResult,
  MeetingRepository,
  SubmitGuestResponseInput,
  SubmitGuestResponseResult,
} from './meetingRepository';

import { getSupabaseClient } from '../lib/supabaseClient';

const notImplemented = async <T>(methodName: string): Promise<T> => {
  throw new Error(
    `[backendMeetingRepository] ${methodName} is not implemented yet. Phase F-4 must provide the real Supabase adapter.`
  );
};

const getClientOrThrow = () => getSupabaseClient();

export const backendMeetingRepository: MeetingRepository = {
  async createMeetingWithInviteLink(): Promise<CreateMeetingWithInviteLinkResult> {
    getClientOrThrow();
    return notImplemented('createMeetingWithInviteLink');
  },

  async getMeetingByInvite(
    _meetingId: MeetingId,
    _token: InviteToken
  ): Promise<{ meeting: MeetingRecord; inviteLink: InviteLink } | null> {
    getClientOrThrow();
    return notImplemented('getMeetingByInvite');
  },

  async getMeetingResponses(_meetingId: MeetingId): Promise<MeetingResponse[]> {
    getClientOrThrow();
    return notImplemented('getMeetingResponses');
  },

  async submitGuestResponse(
    _input: SubmitGuestResponseInput
  ): Promise<SubmitGuestResponseResult> {
    getClientOrThrow();
    return notImplemented('submitGuestResponse');
  },

  async confirmPlan(_input: ConfirmPlanInput): Promise<ConfirmedPlan> {
    getClientOrThrow();
    return notImplemented('confirmPlan');
  },

  async getConfirmedPlan(_meetingId: MeetingId): Promise<ConfirmedPlan | null> {
    getClientOrThrow();
    return notImplemented('getConfirmedPlan');
  },

  async getMeetingById(_meetingId: MeetingId): Promise<MeetingRecord | null> {
    getClientOrThrow();
    return notImplemented('getMeetingById');
  },
};
