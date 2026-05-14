export type CalendarProviderId = 'google' | 'device';

export type CalendarSource = 'our_calendar' | 'meeting' | 'external_google' | 'external_device';

export type OurCalendarEventType =
  | 'confirmed_meeting'
  | 'candidate_date'
  | 'personal_note'
  | 'shared_note'
  | 'imported_hint';

export interface OurCalendarEvent {
  id: string;
  dateKey: string; // YYYY-MM-DD
  title: string;
  type: OurCalendarEventType;
  source: CalendarSource;
  timeLabel?: string;
  meetingId?: string;
  noteId?: string;
  colorKey?: 'rose' | 'sky' | 'beige' | 'gray' | 'ink';
  isShared?: boolean;
}

export interface OurCalendarMemo {
  id: string;
  dateKey: string;
  title: string;
  body: string;
  tags: string[];
  visibility: 'private' | 'shared_calendar' | 'meeting_context';
  createdBy: string;
  linkedMeetingId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OurCalendarSpace {
  id: string;
  title: string;
  ownerName: string;
  description?: string;
  isShared: boolean;
  shareToken?: string;
  memberCount?: number;
}

export interface OurCalendarShareLink {
  id: string;
  calendarSpaceId: string;
  token: string;
  accessMode: 'read_only' | 'memo_add';
  expiresAt?: string;
  createdAt: string;
}

export interface ExternalCalendarHint {
  id: string;
  providerId: CalendarProviderId;
  dateKey: string;
  timeLabel?: string;
  title: string;
  note?: string;
  busyLevel: 'low' | 'medium' | 'high';
}

export interface CalendarProvider {
  id: CalendarProviderId;
  label: string;
  connected: boolean;
}

export interface BusyDay {
  dateKey: string; // YYYY-MM-DD
  busyCount: number;
  summary?: string;
}
