import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, Lock } from 'lucide-react';
import { localOurCalendarRepository } from '../../repositories/localOurCalendarRepository';
import type {
  OurCalendarEvent,
  OurCalendarMemo,
  OurCalendarShareLink,
  OurCalendarSpace,
} from '../../types/calendar';

export const SharedCalendarScreen = () => {
  const { token } = useParams();
  const [shareLink, setShareLink] = useState<OurCalendarShareLink | null>(null);
  const [space, setSpace] = useState<OurCalendarSpace | null>(null);
  const [events, setEvents] = useState<OurCalendarEvent[]>([]);
  const [memos, setMemos] = useState<OurCalendarMemo[]>([]);
  const [loadState, setLoadState] = useState<'loading' | 'ready' | 'invalid'>('loading');

  useEffect(() => {
    if (!token) {
      setLoadState('invalid');
      return;
    }

    let mounted = true;

    const load = async () => {
      const nextShareLink = await localOurCalendarRepository.getShareLinkByToken(token);

      if (!mounted) return;

      if (!nextShareLink) {
        setLoadState('invalid');
        return;
      }

      const [nextSpace, nextEvents, nextMemos] = await Promise.all([
        localOurCalendarRepository.getCalendarSpace(),
        localOurCalendarRepository.getCalendarEvents(),
        localOurCalendarRepository.getCalendarMemos(),
      ]);

      if (!mounted) return;

      setShareLink(nextShareLink);
      setSpace(nextSpace);
      setEvents(nextEvents);
      setMemos(nextMemos);
      setLoadState('ready');
    };

    load();

    return () => {
      mounted = false;
    };
  }, [token]);

  if (loadState === 'loading') {
    return <div className="min-h-dvh bg-bg-app p-6">공유 달력을 불러오는 중이에요...</div>;
  }

  if (loadState === 'invalid') {
    return (
      <div className="min-h-dvh bg-bg-app p-6 flex flex-col items-center justify-center text-center gap-3">
        <Lock size={32} className="text-ink-hint" />
        <h1 className="text-xl font-bold text-ink">열 수 없는 달력이에요</h1>
        <p className="text-sm text-ink-muted">공유 링크가 만료되었거나 잘못되었을 수 있어요.</p>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-bg-app p-5">
      <header className="pt-6 pb-5">
        <div className="flex items-center gap-2 text-rose font-bold text-sm mb-2">
          <Calendar size={16} />
          공유 달력
        </div>
        <h1 className="text-2xl font-bold text-ink">{space?.title}</h1>
        <p className="text-sm text-ink-muted mt-2">{space?.description}</p>
      </header>

      <section className="bg-white rounded-2xl border border-ink-line p-4 mb-4">
        <h2 className="font-bold text-lg mb-3">모임 이벤트</h2>
        <div className="flex flex-col gap-3">
          {events.map(event => (
            <div key={event.id} className="border-b border-ink-line/50 pb-3 last:border-b-0 last:pb-0">
              <p className="font-bold text-ink">{event.title}</p>
              <p className="text-xs text-ink-hint">{event.dateKey} · {event.timeLabel || '시간 미정'}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-2xl border border-ink-line p-4">
        <h2 className="font-bold text-lg mb-3">달력 메모</h2>
        <div className="flex flex-col gap-3">
          {memos.map(memo => (
            <div key={memo.id} className="bg-amber-50 border border-amber-200 rounded-xl p-3">
              <p className="font-bold text-ink">{memo.title}</p>
              <p className="text-xs text-ink-muted mt-1">{memo.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
