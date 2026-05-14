import React from 'react';

export const CalendarDayCell: React.FC<{ 
  day: number;
  isSelected: boolean;
  busyCount: number;
  eventCount?: number;
  memoCount?: number;
  externalHintCount?: number;
  onClick: () => void;
}> = ({ 
  day, 
  isSelected, 
  busyCount, 
  eventCount = 0,
  memoCount = 0,
  externalHintCount = 0,
  onClick 
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        relative aspect-square rounded-xl flex flex-col items-center justify-center text-sm font-bold transition-all
        ${isSelected ? 'bg-rose text-white shadow-md scale-105 z-10' : 'bg-transparent text-ink hover:bg-ivory'}
      `}
    >
      {day}
      {!isSelected && (
        <div className="absolute bottom-1 flex gap-0.5 mt-1 items-center justify-center">
          {busyCount > 0 && <span className="w-1 h-1 rounded-full bg-ink-hint opacity-40" />}
          {eventCount > 0 && <span className="w-1.5 h-1.5 rounded-full bg-rose" />}
          {memoCount > 0 && <span className="w-1 h-1 rounded-full bg-amber-400" />}
          {externalHintCount > 0 && <span className="w-1 h-1 rounded-full bg-sky-400" />}
        </div>
      )}
    </button>
  );
};
