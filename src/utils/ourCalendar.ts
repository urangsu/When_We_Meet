import type {
  OurCalendarEvent,
  OurCalendarMemo,
  ExternalCalendarHint,
} from '../types/calendar';

export const getEventsByDateKey = (
  events: OurCalendarEvent[],
  dateKey: string
) => events.filter(event => event.dateKey === dateKey);

export const getMemosByDateKey = (
  memos: OurCalendarMemo[],
  dateKey: string
) => memos.filter(memo => memo.dateKey === dateKey);

export const getExternalHintsByDateKey = (
  hints: ExternalCalendarHint[],
  dateKey: string
) => hints.filter(hint => hint.dateKey === dateKey);

export const getCalendarContextByDateKey = ({
  dateKey,
  events,
  memos,
  externalHints,
}: {
  dateKey: string;
  events: OurCalendarEvent[];
  memos: OurCalendarMemo[];
  externalHints: ExternalCalendarHint[];
}) => ({
  events: getEventsByDateKey(events, dateKey),
  memos: getMemosByDateKey(memos, dateKey),
  externalHints: getExternalHintsByDateKey(externalHints, dateKey),
});
