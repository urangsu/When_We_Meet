const CREATED_MEETING_IDS_KEY = 'wwm:created-meeting-ids:v1';

export const createdMeetingRegistry = {
  list(): string[] {
    if (typeof window === 'undefined') return [];
    try {
      const raw = window.localStorage.getItem(CREATED_MEETING_IDS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },
  add(meetingId: string): void {
    if (typeof window === 'undefined') return;
    try {
      const ids = this.list();
      if (!ids.includes(meetingId)) {
        window.localStorage.setItem(CREATED_MEETING_IDS_KEY, JSON.stringify([meetingId, ...ids]));
      }
    } catch (e) {
      console.error(e);
    }
  },
  remove(meetingId: string): void {
    if (typeof window === 'undefined') return;
    try {
      const ids = this.list();
      window.localStorage.setItem(CREATED_MEETING_IDS_KEY, JSON.stringify(ids.filter((id) => id !== meetingId)));
    } catch (e) {
      console.error(e);
    }
  }
};
