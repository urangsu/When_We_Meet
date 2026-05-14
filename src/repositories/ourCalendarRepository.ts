import type {
  OurCalendarEvent,
  OurCalendarMemo,
  OurCalendarSpace,
  OurCalendarShareLink,
  ExternalCalendarHint,
} from '../types/calendar';

export interface CreateCalendarMemoInput {
  dateKey: string;
  title: string;
  body: string;
  tags: string[];
  visibility: OurCalendarMemo['visibility'];
  linkedMeetingId?: string;
}

export interface UpdateCalendarMemoInput {
  id: string;
  title?: string;
  body?: string;
  tags?: string[];
  visibility?: OurCalendarMemo['visibility'];
  linkedMeetingId?: string;
}

export interface OurCalendarRepository {
  getCalendarSpace(): Promise<OurCalendarSpace>;
  getCalendarEvents(): Promise<OurCalendarEvent[]>;
  getCalendarMemos(): Promise<OurCalendarMemo[]>;
  getExternalHints(): Promise<ExternalCalendarHint[]>;
  getShareLinkByToken(token: string): Promise<OurCalendarShareLink | null>;

  createCalendarMemo(input: CreateCalendarMemoInput): Promise<OurCalendarMemo>;
  updateCalendarMemo(input: UpdateCalendarMemoInput): Promise<OurCalendarMemo>;
  deleteCalendarMemo(id: string): Promise<void>;
}
