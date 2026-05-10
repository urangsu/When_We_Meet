import React from 'react';

export const CandidateDateChip: React.FC<{ date: string, onRemove?: () => void }> = ({ date, onRemove }) => {
  return (
    <div className="flex items-center gap-2 bg-white border-rose border-[1.5px] px-3 py-1.5 rounded-full shadow-sm text-sm font-semibold text-rose-deep">
      {date}
    </div>
  );
};
