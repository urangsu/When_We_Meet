interface InviteShareUrlInput {
  origin?: string;
  meetingId?: string;
  token?: string;
  demo?: boolean;
}

export const getInviteHashPath = ({
  meetingId,
  token,
  demo,
}: InviteShareUrlInput) => {
  if (demo || !meetingId || !token) {
    return '/#/invite/demo';
  }

  return `/#/invite/${meetingId}/${token}`;
};

export const getInviteShareUrl = (input: InviteShareUrlInput) => {
  const origin =
    input.origin ||
    (typeof window !== 'undefined'
      ? window.location.origin
      : 'https://whenwemeet.app');

  return `${origin}${getInviteHashPath(input)}`;
};
