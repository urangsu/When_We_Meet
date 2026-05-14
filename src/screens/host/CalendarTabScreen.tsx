import React, { useEffect, useState } from 'react';
import { ScreenShell } from '../../components/layout/ScreenShell';
import { Calendar, Users, Copy, Link as LinkIcon, Info } from 'lucide-react';
import { localOurCalendarRepository } from '../../repositories/localOurCalendarRepository';
import type {
  ExternalCalendarHint,
  OurCalendarEvent,
  OurCalendarMemo,
  OurCalendarSpace,
} from '../../types/calendar';
import { Button } from '../../components/Button';

const getMonthDay = (dateKey: string) => {
  const parts = dateKey.split('-');
  return {
    month: `${parseInt(parts[1], 10)}월`,
    day: `${parseInt(parts[2], 10)}`,
  };
};

export const CalendarTabScreen = () => {
  const [calendarSpace, setCalendarSpace] = useState<OurCalendarSpace | null>(null);
  const [events, setEvents] = useState<OurCalendarEvent[]>([]);
  const [memos, setMemos] = useState<OurCalendarMemo[]>([]);
  const [externalHints, setExternalHints] = useState<ExternalCalendarHint[]>([]);
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle');

  useEffect(() => {
    localOurCalendarRepository.getCalendarSpace().then(setCalendarSpace);
    localOurCalendarRepository.getCalendarEvents().then(setEvents);
    localOurCalendarRepository.getCalendarMemos().then(setMemos);
    localOurCalendarRepository.getExternalHints().then(setExternalHints);
  }, []);

  const calendarShareUrl = calendarSpace?.shareToken
    ? `${window.location.origin}/#/calendar/shared/${calendarSpace.shareToken}`
    : '';

  const copyShareLink = async () => {
    if (!calendarShareUrl) return;

    try {
      await navigator.clipboard.writeText(calendarShareUrl);
      setCopyState('copied');
    } catch {
      setCopyState('failed');
      alert(`복사에 실패했어요. 아래 링크를 직접 복사해 주세요:\n${calendarShareUrl}`);
    }
  };

  return (
    <ScreenShell withBottomNav className="bg-bg-app">
      <header className="px-5 pt-8 pb-4">
        <h1 className="text-2xl font-bold mb-2">우리 달력</h1>
        <p className="text-ink-muted text-sm leading-relaxed">
          약속 후보, 확정 모임, 메모를 한 곳에 모아요.
        </p>
      </header>

      <div className="px-5 pb-6 flex flex-col gap-6">
        {/* Shared Calendar Card */}
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-5 text-white shadow-md relative overflow-hidden">
          <div className="relative z-10 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">{calendarSpace?.title}</h2>
              <div className="flex items-center gap-1.5 bg-white/20 px-2 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
                <Users size={12} />
                <span>{calendarSpace?.memberCount}명 참여 중</span>
              </div>
            </div>
            <p className="text-white/80 text-sm mb-4">{calendarSpace?.description}</p>
            <Button onClick={copyShareLink} variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 w-fit h-9 text-sm">
              <Copy size={16} /> {copyState === 'copied' ? '복사 완료' : '공유 링크 복사'}
            </Button>
          </div>
        </div>

        {/* This Month Timeline */}
        <section>
           <h3 className="font-bold text-lg mb-3 pl-1">오늘/이번 달 모임 이벤트</h3>
           <div className="bg-white rounded-2xl p-4 shadow-sm border border-ink-line/50 flex flex-col gap-4">
              {events.map((event, index) => {
                const { month, day } = getMonthDay(event.dateKey);
                return (
                  <React.Fragment key={event.id}>
                    {index > 0 && <div className="border-t border-ink-line/50"></div>}
                    <div className="flex gap-4 items-center">
                      <div className="flex flex-col items-center justify-center bg-bg-app rounded-xl w-14 h-14 shrink-0">
                        <span className={`text-xs font-bold ${event.type === 'confirmed_meeting' ? 'text-sky' : 'text-rose'}`}>{month}</span>
                        <span className="text-xl font-bold text-ink">{day}</span>
                      </div>
                      <div className="flex flex-col gap-1 w-full">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-ink">{event.title}</span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${event.type === 'confirmed_meeting' ? 'bg-sky-100 text-sky-700' : 'bg-rose-100 text-rose-700'}`}>
                            {event.type === 'confirmed_meeting' ? '확정' : '후보'}
                          </span>
                        </div>
                        <span className="text-xs text-ink-hint">{event.timeLabel || '시간 미정'}</span>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
           </div>
        </section>

        {/* Calendar Memos */}
        <section>
          <h3 className="font-bold text-lg mb-3 pl-1 flex items-center justify-between">
             달력 메모
             <span className="text-[10px] font-bold text-rose bg-rose-50 px-2 py-1 rounded-full">모임 만들 때 참고됨</span>
          </h3>
          <div className="flex flex-col gap-3">
            {memos.map((memo) => (
              <div key={memo.id} className="bg-amber-50 border border-amber-200/50 rounded-2xl p-4">
                 <div className="flex items-center justify-between mb-2">
                   <h4 className="font-bold text-ink">{memo.title}</h4>
                   <span className="text-[10px] text-amber-700 font-bold px-1.5 py-0.5 bg-amber-100 rounded-full">{memo.dateKey}</span>
                 </div>
                 <p className="text-sm text-ink-muted mb-3 leading-relaxed">{memo.body}</p>
                 <div className="flex gap-1.5 flex-wrap">
                   {memo.tags.map(tag => (
                     <span key={tag} className="text-[10px] font-medium text-ink-hint bg-white border border-amber-200 px-2 py-0.5 rounded-full">#{tag}</span>
                   ))}
                 </div>
              </div>
            ))}
          </div>
        </section>

        {/* External Hints */}
        <section>
          <h3 className="font-bold text-lg mb-3 pl-1">외부 캘린더 힌트</h3>
          <div className="bg-bg-app border border-ink-line rounded-2xl p-4 flex flex-col gap-3">
             <div className="flex items-start gap-2">
                <Info size={16} className="text-ink-hint mt-0.5 shrink-0" />
                <p className="text-xs text-ink-muted leading-relaxed">
                  외부 캘린더는 전체 일정을 가져오지 않고, 우리 달력에서 모임을 잡을 때 <strong>참고용 혼잡도 힌트</strong>로만 쓰여요.
                </p>
             </div>
             {externalHints.map(hint => (
               <div key={hint.id} className="bg-white rounded-xl p-3 border border-ink-line/50 flex flex-col gap-1">
                 <div className="flex items-center gap-2">
                   <span className="text-xs font-bold text-ink">{hint.dateKey}</span>
                   <span className="text-xs text-ink-hint">{hint.timeLabel}</span>
                 </div>
                 <p className="text-sm font-bold text-ink">{hint.title}</p>
                 <p className="text-xs text-ink-muted">{hint.note}</p>
               </div>
             ))}
          </div>
        </section>

      </div>
    </ScreenShell>
  );
};
