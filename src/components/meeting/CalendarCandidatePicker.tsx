import React from 'react';
import { ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { Chip } from '../Card';
import { Button } from '../Button';
import { CalendarDayCell } from './CalendarDayCell';
import { CandidateDateChip } from './CandidateDateChip';
import { CalendarProviderStatusRow } from './CalendarProviderStatusRow';
import { useDateCandidatePicker } from '../../hooks/useDateCandidatePicker';
import { getMonthDays, getMonthStartOffset } from '../../utils/calendar';
import type { CalendarProvider, BusyDay, OurCalendarEvent, OurCalendarMemo, ExternalCalendarHint } from '../../types/calendar';
import { getCalendarContextByDateKey } from '../../utils/ourCalendar';
import { BottomCTA } from '../layout/BottomCTA';

interface CalendarCandidatePickerProps {
  year: number;
  month: number;
  providers: CalendarProvider[];
  busyDays: BusyDay[];
  calendarEvents?: OurCalendarEvent[];
  calendarMemos?: OurCalendarMemo[];
  externalHints?: ExternalCalendarHint[];
  onPreviousMonth?: () => void;
  onNextMonth?: () => void;
  onSubmit: (selectedDates: { day: number; label: string }[]) => void;
  withBottomNav?: boolean;
}

export const CalendarCandidatePicker: React.FC<CalendarCandidatePickerProps> = ({
  year,
  month,
  providers,
  busyDays,
  calendarEvents = [],
  calendarMemos = [],
  externalHints = [],
  onPreviousMonth,
  onNextMonth,
  onSubmit,
  withBottomNav = false,
}) => {
  const { selectedDates, toggleDate, selectedDateLabels, getBusyCount } = useDateCandidatePicker(year, month, busyDays);
  const daysInMonth = getMonthDays(year, month);
  const startOffset = getMonthStartOffset(year, month);

  const toDateKey = (d: number) =>
    `${year}-${String(month).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

  const getContextCounts = (day: number) => {
    const context = getCalendarContextByDateKey({
      dateKey: toDateKey(day),
      events: calendarEvents,
      memos: calendarMemos,
      externalHints,
    });

    return {
      eventCount: context.events.length,
      memoCount: context.memos.length,
      externalHintCount: context.externalHints.length,
    };
  };

  const selectedContexts = selectedDates.map(day => {
    return {
      day,
      ...getCalendarContextByDateKey({
        dateKey: toDateKey(day),
        events: calendarEvents,
        memos: calendarMemos,
        externalHints,
      })
    };
  }).filter(ctx => ctx.events.length > 0 || ctx.memos.length > 0 || ctx.externalHints.length > 0);

  return (
    <>
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-ink-line">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-lg">{year}년 {month}월</h3>
          <div className="flex gap-4">
            <button onClick={onPreviousMonth} className="text-ink-hint hover:text-ink"><ChevronLeft size={20}/></button>
            <button onClick={onNextMonth} className="text-ink-hint hover:text-ink"><ChevronRight size={20}/></button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-y-3 gap-x-1 mb-6">
          {['일', '월', '화', '수', '목', '금', '토'].map((day, i) => (
            <div key={day} className={`text-center text-xs font-bold ${i === 0 ? 'text-rose' : 'text-ink-hint'}`}>{day}</div>
          ))}
          {Array.from({ length: startOffset }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const isSelected = selectedDates.includes(day);
            const busyCount = getBusyCount(day);
            const { eventCount, memoCount, externalHintCount } = getContextCounts(day);

            return (
              <CalendarDayCell 
                key={day} 
                day={day} 
                isSelected={isSelected} 
                busyCount={busyCount} 
                eventCount={eventCount}
                memoCount={memoCount}
                externalHintCount={externalHintCount}
                onClick={() => toggleDate(day)} 
              />
            );
          })}
        </div>
        
        <CalendarProviderStatusRow providers={providers} />
      </div>

      <div className="flex gap-2">
        <Chip selected onClick={() => {}}><Filter size={14}/> 바쁜 날 제외</Chip>
        <Chip onClick={() => {}}>겹치는 일정 적은 순</Chip>
      </div>

      {selectedDateLabels.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {selectedDateLabels.map(({ day, label }) => {
            return (
              <CandidateDateChip key={day} date={label} onRemove={() => toggleDate(day)} />
            );
          })}
        </div>
      )}

      {selectedDates.length > 0 && (
        <div className="bg-white border border-ink-line rounded-2xl p-4 flex flex-col gap-3">
          <h3 className="font-bold text-sm">선택한 날짜의 달력 메모</h3>
          {selectedContexts.length > 0 ? (
            selectedContexts.map(ctx => (
              <div key={ctx.day} className="flex flex-col gap-2">
                <span className="text-xs font-bold text-rose">{month}월 {ctx.day}일</span>
                {ctx.memos.map(memo => (
                  <div key={memo.id} className="bg-amber-50 rounded-xl p-3 border border-amber-200">
                    <span className="text-xs font-bold text-ink">{memo.title}</span>
                    <p className="text-xs text-ink-muted mt-1">{memo.body}</p>
                  </div>
                ))}
                {ctx.events.map(ev => (
                  <div key={ev.id} className="bg-sky-50 rounded-xl p-3 border border-sky-200">
                    <span className="text-xs font-bold text-ink">{ev.title}</span>
                    <p className="text-xs text-ink-muted mt-1">{ev.type === 'confirmed_meeting' ? '확정된 모임' : '다른 모임 후보'}</p>
                  </div>
                ))}
                {ctx.externalHints.map(hint => (
                  <div key={hint.id} className="bg-bg-app rounded-xl p-3 border border-ink-line">
                    <span className="text-xs font-bold text-ink">{hint.title} (외부 캘린더)</span>
                    <p className="text-xs text-ink-muted mt-1">{hint.note}</p>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <p className="text-xs text-ink-muted">이 날짜에는 아직 메모가 없어요.</p>
          )}
        </div>
      )}

      <BottomCTA withBottomNav={withBottomNav}>
        <Button 
          disabled={selectedDates.length === 0} 
          onClick={() => onSubmit(selectedDateLabels)} 
          size="full"
        >
          {selectedDates.length > 0 ? `다음 · 시간 정하기 (${selectedDates.length}개)` : '날짜를 선택해 주세요'}
        </Button>
      </BottomCTA>
    </>
  );
};
