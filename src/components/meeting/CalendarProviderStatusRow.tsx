import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { calendarProviders } from '../../data/mockCalendar';

export const CalendarProviderStatusRow = () => {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {calendarProviders.map(provider => (
        <div key={provider.id} className="flex items-center gap-1.5 bg-white border border-ink-line px-3 py-1.5 rounded-full whitespace-nowrap">
          <CheckCircle2 size={14} className="text-success" />
          <span className="text-xs font-bold text-ink-muted">{provider.label} 연결됨</span>
        </div>
      ))}
    </div>
  );
};
