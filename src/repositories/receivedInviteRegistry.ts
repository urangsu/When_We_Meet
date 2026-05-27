export interface ReceivedInviteEntry {
  meetingId: string;
  token: string;
  title: string;
  hostName?: string;
  message?: string;
  openedAt: string;
  respondedAt?: string;
  lastViewedAt: string;
}

const RECEIVED_INVITES_KEY = 'wwm:received-invites:v1';

export const receivedInviteRegistry = {
  list(): ReceivedInviteEntry[] {
    if (typeof window === 'undefined') return [];
    try {
      const raw = window.localStorage.getItem(RECEIVED_INVITES_KEY);
      if (!raw) return [];
      return JSON.parse(raw);
    } catch {
      return [];
    }
  },

  upsert(entry: ReceivedInviteEntry) {
    if (typeof window === 'undefined') return;
    try {
      const entries = this.list();
      const existingIndex = entries.findIndex(e => e.meetingId === entry.meetingId);
      if (existingIndex >= 0) {
        entries[existingIndex] = { ...entries[existingIndex], ...entry };
      } else {
        entries.push(entry);
      }
      entries.sort((a, b) => new Date(b.lastViewedAt).getTime() - new Date(a.lastViewedAt).getTime());
      window.localStorage.setItem(RECEIVED_INVITES_KEY, JSON.stringify(entries));
    } catch (e) {
      console.error(e);
    }
  },

  markResponded(meetingId: string) {
    if (typeof window === 'undefined') return;
    try {
      const entries = this.list();
      const entry = entries.find(e => e.meetingId === meetingId);
      if (entry) {
        entry.respondedAt = new Date().toISOString();
        window.localStorage.setItem(RECEIVED_INVITES_KEY, JSON.stringify(entries));
      }
    } catch (e) {
      console.error(e);
    }
  },

  remove(meetingId: string) {
    if (typeof window === 'undefined') return;
    try {
      const entries = this.list();
      window.localStorage.setItem(
        RECEIVED_INVITES_KEY,
        JSON.stringify(entries.filter(e => e.meetingId !== meetingId))
      );
    } catch (e) {
      console.error(e);
    }
  },
  
  clear() {
    if (typeof window === 'undefined') return;
    window.localStorage.removeItem(RECEIVED_INVITES_KEY);
  }
};
