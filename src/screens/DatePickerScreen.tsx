import React, { useState } from 'react';
import { Button } from '../components/Button';
import { ChevronLeft, ChevronRight, Calendar as CalIcon, Filter } from 'lucide-react';
import { Chip } from '../components/Card';

export const DatePickerScreen = ({ onNext, onBack }: { onNext: (dates: string[]) => void, onBack: () => void }) => {
  const [selectedDates, setSelectedDates] = useState<number[]>([]);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const toggleDate = (day: number) => {
    if (selectedDates.includes(day)) {
      setSelectedDates(selectedDates.filter(d => d !== day));
    } else {
      setSelectedDates([...selectedDates, day]);
    }
  };

  return (
    <div className="flex flex-col gap-8 h-full">
      <header className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 -ml-2"><ChevronLeft size={24}/></button>
        <h1 className="hero-title text-2xl">언제 만날까요?</h1>
      </header>

      <div className="bg-white rounded-[28px] p-6 shadow-warm border border-ink-line/5">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-lg">2026년 6월</h3>
          <div className="flex gap-4">
            <button className="text-ink-hint"><ChevronLeft size={20}/></button>
            <button className="text-ink-hint"><ChevronRight size={20}/></button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center mb-4">
          {['일', '월', '화', '수', '목', '금', '토'].map((d, i) => (
            <span key={d} className={`text-[10px] font-bold ${i === 0 ? 'text-rose' : 'text-ink-hint'}`}>{d}</span>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {days.map((day) => {
            const isSelected = selectedDates.includes(day);
            const isBusy = [5, 12, 19, 26].includes(day); // Mock busy days
            return (
              <button
                key={day}
                onClick={() => toggleDate(day)}
                className={`
                  relative aspect-square rounded-xl flex flex-col items-center justify-center text-sm font-bold transition-all
                  ${isSelected ? 'bg-rose text-white shadow-lg scale-110 z-10' : 'bg-transparent text-ink hover:bg-ivory'}
                `}
              >
                {day}
                {isBusy && !isSelected && <div className="absolute bottom-1 w-1 h-1 rounded-full bg-ink-hint opacity-30" />}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3 overflow-x-auto pb-2 -mx-2 px-2 no-scrollbar">
          <div className="flex items-center gap-2 bg-cream/50 px-4 py-2 rounded-full whitespace-nowrap">
            <CalIcon size={16} className="text-ink-muted" />
            <span className="text-xs font-bold text-ink-muted">Google Calendar 연결됨</span>
          </div>
          <div className="flex items-center gap-2 bg-cream/50 px-4 py-2 rounded-full whitespace-nowrap">
            <CalIcon size={16} className="text-ink-muted" />
            <span className="text-xs font-bold text-ink-muted">기기 캘린더 연결됨</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Chip selected><Filter size={14}/> 바쁜 날 제외</Chip>
          <Chip>겹치는 일정 적은 순</Chip>
        </div>
      </div>

      <div className="mt-auto pb-10">
        <div className="flex justify-between items-center mb-4 px-2">
          <span className="text-sm font-bold text-ink-hint">선택된 날짜</span>
          <span className="text-sm font-bold text-rose">{selectedDates.length}개</span>
        </div>
        <Button 
          disabled={selectedDates.length === 0} 
          onClick={() => onNext(selectedDates.map(d => `6월 ${d}일`))} 
          size="full"
        >
          후보 저장
        </Button>
      </div>
    </div>
  );
};
