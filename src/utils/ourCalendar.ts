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

export const getPrimaryScheduleLabel = ({
  events,
  externalHints,
}: {
  events: OurCalendarEvent[];
  externalHints: ExternalCalendarHint[];
}) => {
  const confirmed = events.find(event => event.type === 'confirmed_meeting');
  if (confirmed) return confirmed.title;

  const candidate = events.find(event => event.type === 'candidate_date');
  if (candidate) return candidate.title;

  const anyEvent = events[0];
  if (anyEvent) return anyEvent.title;

  const external = externalHints[0];
  if (external) return external.title;

  return '';
};

export const getRecordLabel = ({
  events,
  memos,
  externalHints,
}: {
  events: OurCalendarEvent[];
  memos: OurCalendarMemo[];
  externalHints: ExternalCalendarHint[];
}) => {
  if (memos.length > 0) return '기록 보기';

  if (events.some(event => event.type === 'confirmed_meeting')) {
    return '준비 메모';
  }

  if (events.some(event => event.type === 'candidate_date')) {
    return '후보 메모';
  }

  if (externalHints.length > 0) {
    return '일정 참고';
  }

  return '기록 적기';
};

export const getRecordTone = ({
  events,
  memos,
  externalHints,
}: {
  events: OurCalendarEvent[];
  memos: OurCalendarMemo[];
  externalHints: ExternalCalendarHint[];
}): 'default' | 'memo' | 'candidate' | 'confirmed' | 'external' => {
  if (memos.length > 0) return 'memo';
  if (events.some(event => event.type === 'confirmed_meeting')) return 'confirmed';
  if (events.some(event => event.type === 'candidate_date')) return 'candidate';
  if (externalHints.length > 0) return 'external';
  return 'default';
};
