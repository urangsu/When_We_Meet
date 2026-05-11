export type MeetingCategory = 
  | 'eat'
  | 'cafe'
  | 'travel'
  | 'birthday'
  | 'info'
  | 'self';

export type ThemeId = 'calendar-kiss' | 'invite-spark' | 'brunch-letter' | 'office-escape';
export type AttendanceStatus = 'yes' | 'maybe' | 'no';

export interface MeetingData {
  category: MeetingCategory | string;
  isRecurring: boolean;
  name: string;
  message: string;
  location?: string;
  theme: ThemeId;
  hostProfile: string;
  candidateDates: string[];
}

export interface GuestResponse {
  nickname: string;
  attendance: AttendanceStatus;
  message?: string;
  selectedDates: string[];
}

