import {
  mockExternalCalendarHints,
  mockOurCalendarEvents,
  mockOurCalendarMemos,
  mockOurCalendarShareLinks,
  mockOurCalendarSpace,
} from '../data/mockOurCalendar';
import type { OurCalendarMemo, OurCalendarEvent } from '../types/calendar';
import type { OurCalendarRepository } from './ourCalendarRepository';

const OUR_CALENDAR_MEMOS_KEY = 'wwm:our-calendar:memos:v1';
const OUR_CALENDAR_EVENTS_KEY = 'wwm:our-calendar:events:v1';

const now = () => new Date().toISOString();

const createId = (prefix: string) =>
  `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;

const hasWindow = () => typeof window !== 'undefined';

const readMemos = () => {
  if (!hasWindow()) return mockOurCalendarMemos;
  const raw = window.localStorage.getItem(OUR_CALENDAR_MEMOS_KEY);
  if (!raw) return mockOurCalendarMemos;

  try {
    return JSON.parse(raw) as OurCalendarMemo[];
  } catch {
    return mockOurCalendarMemos;
  }
};

const writeMemos = (memos: OurCalendarMemo[]) => {
  if (hasWindow()) {
    window.localStorage.setItem(OUR_CALENDAR_MEMOS_KEY, JSON.stringify(memos));
  }
};

const readEvents = () => {
  if (!hasWindow()) return mockOurCalendarEvents;
  const raw = window.localStorage.getItem(OUR_CALENDAR_EVENTS_KEY);
  if (!raw) return mockOurCalendarEvents;

  try {
    return JSON.parse(raw) as OurCalendarEvent[];
  } catch {
    return mockOurCalendarEvents;
  }
};

const writeEvents = (events: OurCalendarEvent[]) => {
  if (hasWindow()) {
    window.localStorage.setItem(OUR_CALENDAR_EVENTS_KEY, JSON.stringify(events));
  }
};

export const localOurCalendarRepository: OurCalendarRepository = {
  async getCalendarSpace() {
    return mockOurCalendarSpace;
  },

  async getCalendarEvents() {
    return readEvents();
  },

  async getCalendarMemos() {
    return readMemos();
  },

  async getExternalHints() {
    return mockExternalCalendarHints;
  },

  async getShareLinkByToken(token) {
    return (
      mockOurCalendarShareLinks.find((shareLink) => shareLink.token === token) ||
      null
    );
  },

  async createCalendarMemo(input) {
    const memos = readMemos();
    const memo: OurCalendarMemo = {
      id: createId('memo'),
      dateKey: input.dateKey,
      title: input.title.trim(),
      body: input.body.trim(),
      tags: input.tags,
      visibility: input.visibility,
      createdBy: '나',
      linkedMeetingId: input.linkedMeetingId,
      createdAt: now(),
      updatedAt: now(),
    };

    const next = [memo, ...memos];
    writeMemos(next);
    return memo;
  },

  async updateCalendarMemo(input) {
    const memos = readMemos();
    const existing = memos.find((memo) => memo.id === input.id);

    if (!existing) {
      throw new Error('수정할 기록을 찾지 못했어요.');
    }

    const updated: OurCalendarMemo = {
      ...existing,
      title: input.title?.trim() ?? existing.title,
      body: input.body?.trim() ?? existing.body,
      tags: input.tags ?? existing.tags,
      visibility: input.visibility ?? existing.visibility,
      linkedMeetingId: input.linkedMeetingId ?? existing.linkedMeetingId,
      updatedAt: now(),
    };

    writeMemos(memos.map((memo) => (memo.id === input.id ? updated : memo)));
    return updated;
  },

  async deleteCalendarMemo(id) {
    const memos = readMemos();
    writeMemos(memos.filter((memo) => memo.id !== id));
  },

  async createCalendarEvent(input) {
    const events = readEvents();
    const event: OurCalendarEvent = {
        ...input,
        id: createId('event'),
        source: 'our_calendar',
    };
    writeEvents([event, ...events]);
    return event;
  },
};
