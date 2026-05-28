import type { AppThemeId } from './theme';

export interface UserProfile {
  displayName: string;
  profileType: 'initial' | 'basic' | 'my-photo' | 'anon';
  colorId: string;
  appThemeId: AppThemeId;
  notifications: {
    inviteResponses: boolean;
    confirmedMeetings: boolean;
    calendarReminders: boolean;
  };
  calendar: {
    ourCalendarEnabled: boolean;
    externalCalendarStatus: 'not_connected' | 'coming_soon' | 'connected';
  };
}
