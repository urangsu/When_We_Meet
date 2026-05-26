export type MeetingCategory = 
  | 'eat'
  | 'cafe'
  | 'travel'
  | 'birthday'
  | 'info'
  | 'self';

export type ThemeId = 'calendar-kiss' | 'invite-spark' | 'brunch-letter' | 'office-escape' | 'prince';
export type ProfileColorId = 'white' | 'black' | 'pink' | 'skyblue' | 'beige' | 'red' | 'gray';

export type { AttendanceStatus } from './types/meeting';
import type { AttendanceStatus } from './types/meeting';

export type {
  CalendarProviderId,
  CalendarProvider,
  BusyDay,
} from './types/calendar';

export interface MeetingData {
  category: MeetingCategory;
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

