import React from 'react';
import { Calendar as CalIcon } from 'lucide-react';
import { calendarProviders } from '../../data/mockCalendar';

export const CalendarProviderStatusRow = () => {
  return (
    <div className="flex items-center gap-3 overflow-x-auto pb-2 -mx-2 px-2 no-scrollbar">
      {calendarProviders.map(provider => (
        <div key={provider.id} className="flex items-center gap-2 bg-cream/50 px-4 py-2 rounded-full whitespace-nowrap">
          <CalIcon size={16} className="text-ink-muted" />
          <span className="text-xs font-bold text-ink-muted">{provider.label}</span>
        </div>
      ))}
    </div>
  );
};
