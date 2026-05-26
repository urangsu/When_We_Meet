import { getAccessToken } from './auth';
import type { ExternalCalendarHint } from '../types/calendar';

export const fetchGoogleCalendarEvents = async (timeMin: Date, timeMax: Date): Promise<ExternalCalendarHint[]> => {
  const token = await getAccessToken();
  if (!token) {
    return [];
  }

  try {
    const url = new URL('https://www.googleapis.com/calendar/v3/calendars/primary/events');
    url.searchParams.append('timeMin', timeMin.toISOString());
    url.searchParams.append('timeMax', timeMax.toISOString());
    url.searchParams.append('singleEvents', 'true');
    url.searchParams.append('orderBy', 'startTime');

    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Google Calendar API error: ${response.status}`);
    }

    const data = await response.json();
    return data.items.map((item: any): ExternalCalendarHint => {
      let dateKey = '';
      let timeLabel = undefined;

      if (item.start.date) {
        // All-day event
        dateKey = item.start.date;
      } else if (item.start.dateTime) {
        // Timed event
        const startDate = new Date(item.start.dateTime);
        const y = startDate.getFullYear();
        const m = String(startDate.getMonth() + 1).padStart(2, '0');
        const d = String(startDate.getDate()).padStart(2, '0');
        dateKey = `${y}-${m}-${d}`;

        const hours = startDate.getHours();
        const mins = String(startDate.getMinutes()).padStart(2, '0');
        const ampm = hours >= 12 ? '오후' : '오전';
        const displayHours = hours % 12 || 12;
        timeLabel = `${ampm} ${displayHours}:${mins}`;
      }

      return {
        id: item.id,
        providerId: 'google',
        dateKey,
        timeLabel,
        title: item.summary || '일정',
        note: '구글 캘린더에서 가져옴',
        busyLevel: 'high',
      };
    });
  } catch (error) {
    console.error('Failed to fetch Google Calendar events', error);
    return [];
  }
};
