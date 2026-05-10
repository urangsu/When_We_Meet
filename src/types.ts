export type Screen = 
  | 'home'
  | 'create-category'
  | 'meeting-info'
  | 'theme-selection'
  | 'profile-picker'
  | 'date-picker'
  | 'invite-preview'
  | 'link-share'
  | 'guest-rsvp'
  | 'response-complete'
  | 'host-dashboard'
  | 'post-meeting';

export interface MeetingData {
  category: string;
  isRecurring: boolean;
  name: string;
  message: string;
  location?: string;
  theme: string;
  hostProfile: string;
  candidateDates: string[];
}

export interface GuestResponse {
  nickname: string;
  attendance: 'go' | 'maybe' | 'no';
  message?: string;
  selectedDates: string[];
}
