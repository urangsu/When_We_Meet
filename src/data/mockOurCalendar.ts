import type {
  OurCalendarEvent,
  OurCalendarMemo,
  OurCalendarSpace,
  OurCalendarShareLink,
  ExternalCalendarHint,
} from '../types/calendar';

export const mockOurCalendarSpace: OurCalendarSpace = {
  id: 'cal-me',
  title: '나의 우리 달력',
  ownerName: '수민',
  description: '모임 후보와 메모를 함께 정리하는 달력',
  isShared: true,
  shareToken: 'cal-demo-token',
  memberCount: 4,
};

export const mockOurCalendarEvents: OurCalendarEvent[] = [
  {
    id: 'evt-1',
    dateKey: '2026-06-21',
    title: '성수 카페 모임 후보',
    type: 'candidate_date',
    source: 'meeting',
    timeLabel: '오후',
    meetingId: 'demo',
    colorKey: 'rose',
    isShared: true,
  },
  {
    id: 'evt-2',
    dateKey: '2026-06-22',
    title: '생일 모임 확정 예정',
    type: 'confirmed_meeting',
    source: 'our_calendar',
    timeLabel: '저녁 7시',
    meetingId: 'demo',
    colorKey: 'sky',
    isShared: true,
  },
];

export const mockOurCalendarMemos: OurCalendarMemo[] = [
  {
    id: 'memo-1',
    dateKey: '2026-06-21',
    title: '성수 쪽이면 카페 후보 보기',
    body: '비 오는 날이면 실내 위주로 보고, 사람이 많으면 예약 가능한 곳 우선.',
    tags: ['성수', '카페', '실내'],
    visibility: 'meeting_context',
    createdBy: '수민',
    createdAt: '2026-06-01T09:00:00.000Z',
    updatedAt: '2026-06-01T09:00:00.000Z',
  },
  {
    id: 'memo-2',
    dateKey: '2026-06-22',
    title: '저녁 약속이면 한강도 후보',
    body: '날씨 좋으면 한강 라면이나 치킨도 괜찮음. 부담 없는 쪽으로.',
    tags: ['한강', '저녁', '가벼운 약속'],
    visibility: 'shared_calendar',
    createdBy: '수민',
    createdAt: '2026-06-01T09:30:00.000Z',
    updatedAt: '2026-06-01T09:30:00.000Z',
  },
];

export const mockOurCalendarShareLinks: OurCalendarShareLink[] = [
  {
    id: 'share-cal-1',
    calendarSpaceId: 'cal-me',
    token: 'cal-demo-token',
    accessMode: 'read_only',
    createdAt: '2026-06-01T10:00:00.000Z',
  },
];

export const mockExternalCalendarHints: ExternalCalendarHint[] = [
  {
    id: 'ext-1',
    providerId: 'google',
    dateKey: '2026-06-21',
    timeLabel: '오전',
    title: '외부 일정 1개',
    note: '오전 일정이 있어 오후가 편할 수 있어요.',
    busyLevel: 'medium',
  },
];
