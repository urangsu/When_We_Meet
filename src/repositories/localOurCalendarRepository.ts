import {
  mockExternalCalendarHints,
  mockOurCalendarEvents,
  mockOurCalendarMemos,
  mockOurCalendarShareLinks,
  mockOurCalendarSpace,
} from '../data/mockOurCalendar';
import type { OurCalendarRepository } from './ourCalendarRepository';

export const localOurCalendarRepository: OurCalendarRepository = {
  async getCalendarSpace() {
    return mockOurCalendarSpace;
  },

  async getCalendarEvents() {
    return mockOurCalendarEvents;
  },

  async getCalendarMemos() {
    return mockOurCalendarMemos;
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
};
