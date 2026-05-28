import type { UserProfile } from '../types/user';

const USER_PROFILE_KEY = 'wwm:user-profile:v1';

const defaultUserProfile: UserProfile = {
  displayName: '호스트',
  profileType: 'initial',
  colorId: 'black',
  appThemeId: 'warm-ivory',
  notifications: {
    inviteResponses: true,
    confirmedMeetings: true,
    calendarReminders: false,
  },
  calendar: {
    ourCalendarEnabled: true,
    externalCalendarStatus: 'coming_soon',
  },
};

const normalizeProfile = (rawProfile: Partial<UserProfile> & { appBackgroundId?: string }): UserProfile => ({
  ...defaultUserProfile,
  ...rawProfile,
  appThemeId:
    (rawProfile.appThemeId as UserProfile['appThemeId']) ||
    (rawProfile.appBackgroundId === 'pure-white' ? 'pure-white' : undefined) ||
    defaultUserProfile.appThemeId,
  notifications: {
    ...defaultUserProfile.notifications,
    ...rawProfile.notifications,
  },
  calendar: {
    ...defaultUserProfile.calendar,
    ...rawProfile.calendar,
  },
});

const canUseStorage = () =>
  typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

export const userProfileRepository = {
  getProfile(): UserProfile {
    if (!canUseStorage()) return defaultUserProfile;

    const raw = localStorage.getItem(USER_PROFILE_KEY);
    if (!raw) return defaultUserProfile;

    try {
      const parsed = JSON.parse(raw);
      return normalizeProfile(parsed);
    } catch {
      return defaultUserProfile;
    }
  },

  saveProfile(profile: UserProfile) {
    if (!canUseStorage()) return;
    localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profile));
  },

  updateProfile(patch: Partial<UserProfile>) {
    const current = this.getProfile();
    const next: UserProfile = {
      ...current,
      ...patch,
      notifications: {
        ...current.notifications,
        ...(patch.notifications || {}),
      },
      calendar: {
        ...current.calendar,
        ...(patch.calendar || {}),
      },
    };
    this.saveProfile(next);
    return next;
  },
};
