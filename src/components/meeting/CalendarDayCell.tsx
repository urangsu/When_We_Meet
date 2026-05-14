import React from 'react';

export const CalendarDayCell: React.FC<{ 
  day: number;
  isSelected: boolean;
  busyCount?: number;
  eventCount?: number;
  memoCount?: number;
  externalHintCount?: number;
  scheduleLabel?: string;
  recordLabel?: string;
  recordTone?: 'default' | 'memo' | 'candidate' | 'confirmed' | 'external';
  onClick: () => void;
  onRecordClick?: () => void;
}> = ({ 
  day, 
  isSelected, 
  busyCount = 0, 
  eventCount = 0,
  memoCount = 0,
  externalHintCount = 0,
  scheduleLabel,
  recordLabel,
  recordTone = 'default',
  onClick,
  onRecordClick
}) => {
  const recordToneColors = {
    default: isSelected ? 'text-white/80' : 'text-ink-hint',
    memo: isSelected ? 'text-amber-100' : 'text-amber-500',
    candidate: isSelected ? 'text-white/80' : 'text-rose',
    confirmed: isSelected ? 'text-rose-100' : 'text-rose-600',
    external: isSelected ? 'text-sky-100' : 'text-sky-500',
  };

  return (
    <button
      onClick={onClick}
      className={`
        relative aspect-square rounded-xl flex flex-col pt-1 text-sm font-bold transition-all overflow-hidden
        ${isSelected ? 'bg-rose text-white shadow-md scale-105 z-10' : 'bg-transparent text-ink hover:bg-ivory'}
      `}
    >
      <div className="flex flex-col items-center justify-start h-full px-1 w-full">
        <div className="flex items-center gap-1">
          <span className="text-[11px] font-bold leading-none mt-0.5">{day}</span>
          {!isSelected && (
            <div className="flex gap-0.5 items-center justify-center">
              {busyCount > 0 && <span className="w-1 h-1 rounded-full bg-ink-hint opacity-40 shrink-0" />}
              {eventCount > 0 && <span className="w-1 h-1 rounded-full bg-rose shrink-0" />}
              {memoCount > 0 && <span className="w-1 h-1 rounded-full bg-amber-400 shrink-0" />}
              {externalHintCount > 0 && <span className="w-1 h-1 rounded-full bg-sky-400 shrink-0" />}
            </div>
          )}
        </div>

        {scheduleLabel ? (
          <span className="mt-1 w-full max-w-full truncate text-[10px] font-bold leading-tight">
            {scheduleLabel}
          </span>
        ) : (
          <span className="mt-1 h-[12px]" />
        )}

        {recordLabel && (
          <div
            onClick={(event) => {
              event.stopPropagation();
              onRecordClick?.() ?? onClick();
            }}
            className={`mt-0.5 w-full max-w-full truncate text-[9px] font-bold leading-tight ${recordToneColors[recordTone]}`}
          >
            {recordLabel}
          </div>
        )}
      </div>
    </button>
  );
};
