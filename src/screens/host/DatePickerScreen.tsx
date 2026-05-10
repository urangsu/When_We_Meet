import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { Chip } from '../../components/Card';
import { useNavigate } from 'react-router-dom';
import { CalendarDayCell } from '../../components/meeting/CalendarDayCell';
import { CandidateDateChip } from '../../components/meeting/CandidateDateChip';
import { CalendarProviderStatusRow } from '../../components/meeting/CalendarProviderStatusRow';
import { busyDays } from '../../data/mockCalendar';

export const DatePickerScreen = () => {
  const [selectedDates, setSelectedDates] = useState<number[]>([]);
  const navigate = useNavigate();

  const toggleDate = (day: number) => {
    setSelectedDates(prev => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day].sort((a,b)=>a-b));
  };

  return (
    <div className="flex flex-col gap-6 h-full p-5 flex-1">
      <header className="flex items-center gap-4 pt-2">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2"><ChevronLeft size={24}/></button>
        <h1 className="font-bold text-2xl">언제 만날까요?</h1>
      </header>

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-ink-line">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-lg">2026년 6월</h3>
          <div className="flex gap-4">
            <button className="text-ink-hint hover:text-ink"><ChevronLeft size={20}/></button>
            <button className="text-ink-hint hover:text-ink"><ChevronRight size={20}/></button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-y-4 gap-x-1 mb-6">
          {['일', '월', '화', '수', '목', '금', '토'].map((day, i) => (
            <div key={day} className={`text-center text-xs font-bold ${i === 0 ? 'text-rose' : 'text-ink-hint'}`}>{day}</div>
          ))}
          {Array.from({ length: 30 }).map((_, i) => {
            const day = i + 1;
            const isSelected = selectedDates.includes(day);
            const isBusy = busyDays.includes(day);

            return (
              <CalendarDayCell 
                key={day} 
                day={day} 
                isSelected={isSelected} 
                isBusy={isBusy} 
                onClick={() => toggleDate(day)} 
              />
            );
          })}
        </div>
        
        <CalendarProviderStatusRow />
      </div>

      <div className="flex gap-2">
        <Chip selected onClick={() => {}}><Filter size={14}/> 바쁜 날 제외</Chip>
        <Chip onClick={() => {}}>겹치는 일정 적은 순</Chip>
      </div>

      {selectedDates.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {selectedDates.map(date => (
            <CandidateDateChip key={date} date={`6월 ${date}일`} onRemove={() => toggleDate(date)} />
          ))}
        </div>
      )}

      <div className="mt-12 pb-10 flex flex-col gap-3">
        <Button 
          disabled={selectedDates.length === 0} 
          onClick={() => navigate('/app/create/preview')} 
          size="full"
        >
          {selectedDates.length > 0 ? `${selectedDates.length}개의 날짜로 초대장 만들기` : '날짜를 선택해 주세요'}
        </Button>
      </div>
    </div>
  );
};
