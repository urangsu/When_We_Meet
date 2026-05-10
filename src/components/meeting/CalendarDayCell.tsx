import React from 'react';

export const CalendarDayCell: React.FC<{ 
  day: number, 
  isSelected: boolean, 
  isBusy: boolean, 
  onClick: () => void 
}> = ({ 
  day, 
  isSelected, 
  isBusy, 
  onClick 
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        relative aspect-square rounded-xl flex flex-col items-center justify-center text-sm font-bold transition-all
        ${isSelected ? 'bg-rose text-white shadow-md scale-110 z-10' : 'bg-transparent text-ink hover:bg-ivory'}
      `}
    >
      {day}
      {isBusy && !isSelected && <div className="absolute bottom-1 w-1 h-1 rounded-full bg-ink-hint opacity-30" />}
    </button>
  );
};
