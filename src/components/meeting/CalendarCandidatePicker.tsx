import React from 'react';
import { ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { Chip } from '../Card';
import { Button } from '../Button';
import { CalendarDayCell } from './CalendarDayCell';
import { CandidateDateChip } from './CandidateDateChip';
import { CalendarProviderStatusRow } from './CalendarProviderStatusRow';
import { useDateCandidatePicker } from '../../hooks/useDateCandidatePicker';
import { getMonthDays, getMonthStartOffset } from '../../utils/calendar';
import type { CalendarProvider, BusyDay } from '../../types/calendar';
import { BottomCTA } from '../layout/BottomCTA';

interface CalendarCandidatePickerProps {
  year: number;
  month: number;
  providers: CalendarProvider[];
  busyDays: BusyDay[];
  onSubmit: (selectedDates: number[]) => void;
  withBottomNav?: boolean;
}

export const CalendarCandidatePicker: React.FC<CalendarCandidatePickerProps> = ({
  year,
  month,
  providers,
  busyDays,
  onSubmit,
  withBottomNav = false,
}) => {
  const { selectedDates, toggleDate, selectedDateLabels, getBusyCount } = useDateCandidatePicker(year, month, busyDays);
  const daysInMonth = getMonthDays(year, month);
  const startOffset = getMonthStartOffset(year, month);

  return (
    <>
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-ink-line">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-lg">{year}년 {month}월</h3>
          <div className="flex gap-4">
            <button className="text-ink-hint hover:text-ink"><ChevronLeft size={20}/></button>
            <button className="text-ink-hint hover:text-ink"><ChevronRight size={20}/></button>
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

            return (
              <CalendarDayCell 
                key={day} 
                day={day} 
                isSelected={isSelected} 
                busyCount={busyCount} 
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

      <BottomCTA withBottomNav={withBottomNav}>
        <Button 
          disabled={selectedDates.length === 0} 
          onClick={() => onSubmit(selectedDates)} 
          size="full"
        >
          {selectedDates.length > 0 ? `${selectedDates.length}개의 날짜 선택 완료` : '날짜를 선택해 주세요'}
        </Button>
      </BottomCTA>
    </>
  );
};
