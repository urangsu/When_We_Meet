import type { UserProfile } from '../types/user';
import { readJson, writeJson } from './localStorageAdapter';

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

export const userProfileRepository = {
  getProfile(): UserProfile {
    try {
      const parsed = readJson<Partial<UserProfile>>(USER_PROFILE_KEY, defaultUserProfile);
      return normalizeProfile(parsed || {});
    } catch {
      return defaultUserProfile;
    }
  },

  saveProfile(profile: UserProfile) {
    try {
      writeJson(USER_PROFILE_KEY, profile);
    } catch (err) {
      console.warn('[userProfileRepository] failed to save profile', err);
    }
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

