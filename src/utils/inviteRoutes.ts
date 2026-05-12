interface InviteRouteInput {
  meetingId?: string;
  token?: string;
}

const getInviteBasePath = ({ meetingId, token }: InviteRouteInput) => {
  if (meetingId && token) {
    return `/invite/${meetingId}/${token}`;
  }
  return '/invite/demo';
};

export const getInviteRoute = (
  input: InviteRouteInput,
  step?: 'nickname' | 'attendance' | 'dates' | 'place' | 'preferences' | 'complete'
) => {
  const base = getInviteBasePath(input);
  return step ? `${base}/${step}` : base;
};
