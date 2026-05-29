import React from 'react';

export const CalendarDayCell: React.FC<{ 
  day: number;
  isSelected: boolean;
  busyCount?: number;
  eventCount?: number;
  memoCount?: number;
  externalHintCount?: number;
  onClick: () => void;
}> = ({ 
  day, 
  isSelected, 
  busyCount = 0, 
  eventCount = 0,
  memoCount = 0,
  externalHintCount = 0,
  onClick,
}) => {
  return (
    <div
      className={`
        relative aspect-square rounded-xl transition-all overflow-hidden border
        ${isSelected 
          ? 'bg-rose border-rose shadow-md scale-105 z-10' 
          : externalHintCount > 0 
            ? 'bg-sky-50/80 border-sky-100 hover:bg-sky-100/50' 
            : 'bg-transparent border-transparent hover:bg-ivory'
        }
      `}
    >
      <button
        type="button"
        onClick={onClick}
        className={`
          absolute inset-0 flex flex-col items-center justify-center w-full h-full
          ${isSelected ? 'text-white' : 'text-ink'}
        `}
      >
        <span className="text-[12px] font-bold leading-none">{day}</span>

        <div className="mt-1 flex h-2 items-center justify-center gap-0.5">
          {eventCount > 0 && (
            <span aria-label="모임 있음" className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white' : 'bg-rose'}`} />
          )}
          {memoCount > 0 && (
            <span aria-label="기록 있음" className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white/80' : 'bg-amber-400'}`} />
          )}
          {externalHintCount > 0 && (
            <span aria-label="외부 일정 힌트 있음" className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white/60' : 'bg-sky-400'}`} />
          )}
          {busyCount > 0 && (
            <span aria-label="바쁜 일정 있음" className={`w-1 h-1 rounded-full ${isSelected ? 'bg-white/50' : 'bg-ink-hint/40'}`} />
          )}
        </div>
      </button>
    </div>
  );
};
