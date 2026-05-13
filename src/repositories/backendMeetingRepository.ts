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

const notImplemented = async <T>(methodName: string): Promise<T> => {
  throw new Error(
    `[backendMeetingRepository] ${methodName} is not implemented yet. Phase F-3 must provide the real backend adapter.`
  );
};

export const backendMeetingRepository: MeetingRepository = {
  createMeetingWithInviteLink(): Promise<CreateMeetingWithInviteLinkResult> {
    return notImplemented('createMeetingWithInviteLink');
  },

  getMeetingByInvite(
    _meetingId: MeetingId,
    _token: InviteToken
  ): Promise<{ meeting: MeetingRecord; inviteLink: InviteLink } | null> {
    return notImplemented('getMeetingByInvite');
  },

  getMeetingResponses(_meetingId: MeetingId): Promise<MeetingResponse[]> {
    return notImplemented('getMeetingResponses');
  },

  submitGuestResponse(
    _input: SubmitGuestResponseInput
  ): Promise<SubmitGuestResponseResult> {
    return notImplemented('submitGuestResponse');
  },

  confirmPlan(_input: ConfirmPlanInput): Promise<ConfirmedPlan> {
    return notImplemented('confirmPlan');
  },

  getConfirmedPlan(_meetingId: MeetingId): Promise<ConfirmedPlan | null> {
    return notImplemented('getConfirmedPlan');
  },

  getMeetingById(_meetingId: MeetingId): Promise<MeetingRecord | null> {
    return notImplemented('getMeetingById');
  },
};
