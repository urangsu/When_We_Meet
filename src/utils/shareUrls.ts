interface InviteShareUrlInput {
  origin?: string;
  meetingId?: string;
  token?: string;
  demo?: boolean;
}

const trimTrailingSlash = (value: string) => value.replace(/\/$/, '');

const getPublicAppUrl = () => {
  const envUrl = import.meta.env.VITE_PUBLIC_APP_URL;

  if (typeof envUrl === 'string' && envUrl.trim().length > 0) {
    return trimTrailingSlash(envUrl.trim());
  }

  if (typeof window !== 'undefined') {
    return trimTrailingSlash(window.location.origin);
  }

  return 'https://whenwemeet.app';
};

export const getInvitePath = ({
  meetingId,
  token,
  demo,
}: InviteShareUrlInput) => {
  if (demo || !meetingId || !token) {
    return '/invite/demo';
  }

  return `/invite/${meetingId}/${token}`;
};

// Backward compatibility during migration.
export const getInviteHashPath = getInvitePath;

export const getInviteShareUrl = (input: InviteShareUrlInput) => {
  const origin = input.origin
    ? trimTrailingSlash(input.origin)
    : getPublicAppUrl();

  return `${origin}${getInvitePath(input)}`;
};
