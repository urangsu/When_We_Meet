export type CalendarProviderId = 'google' | 'device';

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
