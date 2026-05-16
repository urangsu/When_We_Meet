import type { UserProfile } from '../types/user';

const USER_PROFILE_KEY = 'wwm:user-profile:v1';

const defaultUserProfile: UserProfile = {
  displayName: '호스트',
  profileType: 'initial',
  colorId: 'black',
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

const canUseStorage = () =>
  typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

export const userProfileRepository = {
  getProfile(): UserProfile {
    if (!canUseStorage()) return defaultUserProfile;

    const raw = localStorage.getItem(USER_PROFILE_KEY);
    if (!raw) return defaultUserProfile;

    try {
      const parsed = JSON.parse(raw);
      return {
        ...defaultUserProfile,
        ...parsed,
        notifications: {
          ...defaultUserProfile.notifications,
          ...(parsed.notifications || {}),
        },
        calendar: {
          ...defaultUserProfile.calendar,
          ...(parsed.calendar || {}),
        },
      };
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
