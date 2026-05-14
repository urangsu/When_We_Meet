import React from 'react';
import type {
  OurCalendarEvent,
  OurCalendarMemo,
  ExternalCalendarHint,
} from '../../types/calendar';

interface OurCalendarShareCardProps {
  title: string;
  dateLabel: string;
  events: OurCalendarEvent[];
  memos: OurCalendarMemo[];
  externalHints: ExternalCalendarHint[];
}

export const OurCalendarShareCard = React.forwardRef<HTMLDivElement, OurCalendarShareCardProps>(
  ({ title, dateLabel, events, memos, externalHints }, ref) => {
    return (
      <div ref={ref} className="w-[360px] bg-bg-app px-6 py-8 border border-ink-line">
        <p className="text-xs font-bold text-rose mb-2">When We Meet · 우리 달력</p>
        <h2 className="text-2xl font-bold text-ink">{title}</h2>
        <p className="text-sm text-ink-muted mt-1 mb-6">{dateLabel}</p>

        <div className="flex flex-col gap-4">
          {events.length > 0 && (
            <section className="bg-white rounded-2xl border border-ink-line p-4">
              <h3 className="font-bold text-base mb-3 text-ink">모임 이벤트 <span className="w-1.5 h-1.5 inline-block rounded-full bg-rose align-middle ml-1 -mt-1" /></h3>
              <div className="flex flex-col gap-3">
                {events.map(ev => (
                  <div key={ev.id} className="pb-3 border-b border-ink-line/50 last:pb-0 last:border-b-0">
                    <p className="font-bold text-ink">{ev.title}</p>
                    <p className="text-xs text-ink-hint mt-1">{ev.type === 'confirmed_meeting' ? '확정' : '다른 후보'}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {memos.length > 0 && (
            <section className="bg-amber-50 rounded-2xl border border-amber-200 p-4">
              <h3 className="font-bold text-base mb-3 text-ink">달력 메모 <span className="w-1.5 h-1.5 inline-block rounded-full bg-amber-400 align-middle ml-1 -mt-1" /></h3>
              <div className="flex flex-col gap-3">
                {memos.map(memo => (
                  <div key={memo.id} className="pb-3 border-b border-amber-200/50 last:pb-0 last:border-b-0">
                    <p className="font-bold text-ink">{memo.title}</p>
                    <p className="text-sm text-ink-muted mt-1">{memo.body}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {externalHints.length > 0 && (
            <section className="bg-white rounded-2xl border border-sky-200 p-4">
              <h3 className="font-bold text-base mb-3 text-ink">외부 캘린더 (참고용) <span className="w-1.5 h-1.5 inline-block rounded-full bg-sky-400 align-middle ml-1 -mt-1" /></h3>
              <div className="flex flex-col gap-3">
                {externalHints.map(hint => (
                  <div key={hint.id} className="pb-3 border-b border-sky-100 last:pb-0 last:border-b-0">
                    <p className="font-bold text-ink">{hint.title}</p>
                    <p className="text-xs text-ink-muted mt-1">{hint.note}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {events.length === 0 && memos.length === 0 && externalHints.length === 0 && (
            <div className="bg-white rounded-2xl border border-ink-line p-6 text-center text-ink-muted text-sm">
              선택한 날짜에 기록된 내용이 없어요.
            </div>
          )}
        </div>
      </div>
    );
  }
);
OurCalendarShareCard.displayName = 'OurCalendarShareCard';
