import React from 'react';

export const CalendarDayCell: React.FC<{ 
  day: number, 
  isSelected: boolean, 
  busyCount: number, 
  onClick: () => void 
}> = ({ 
  day, 
  isSelected, 
  busyCount, 
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
      {!isSelected && busyCount > 0 && (
        <div className="absolute bottom-1 flex gap-0.5">
          {Array.from({ length: Math.min(busyCount, 3) }).map((_, i) => (
            <div key={i} className={`w-1 h-1 rounded-full ${busyCount >= 2 ? 'bg-ink-hint opacity-50' : 'bg-ink-hint opacity-30'}`} />
          ))}
        </div>
      )}
    </button>
  );
};
