import type {
  OurCalendarEvent,
  OurCalendarMemo,
  OurCalendarSpace,
  OurCalendarShareLink,
  ExternalCalendarHint,
} from '../types/calendar';

export interface OurCalendarRepository {
  getCalendarSpace(): Promise<OurCalendarSpace>;
  getCalendarEvents(): Promise<OurCalendarEvent[]>;
  getCalendarMemos(): Promise<OurCalendarMemo[]>;
  getExternalHints(): Promise<ExternalCalendarHint[]>;
  getShareLinkByToken(token: string): Promise<OurCalendarShareLink | null>;
}
