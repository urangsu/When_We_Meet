// Prototype mock data.
// Real calendar provider integration will replace this with Google Calendar / device calendar data.

export type CalendarProviderId = 'google' | 'device';

export interface CalendarProviderMock {
  id: CalendarProviderId;
  label: string;
  connected: boolean;
}

export interface BusyDayMock {
  dateKey: string; // YYYY-MM-DD
  busyCount: number;
  summary?: string;
}

export const calendarProviders: CalendarProviderMock[] = [
  { id: 'google', label: 'Google Calendar', connected: true },
  { id: 'device', label: '기기 캘린더', connected: true },
];

export const busyDays: BusyDayMock[] = [
  { dateKey: '2026-06-05', busyCount: 1, summary: '오전 일정 1개' },
  { dateKey: '2026-06-12', busyCount: 2, summary: '오후 일정 2개' },
  { dateKey: '2026-06-19', busyCount: 1, summary: '저녁 일정 1개' },
  { dateKey: '2026-06-26', busyCount: 3, summary: '일정 3개' },
];
