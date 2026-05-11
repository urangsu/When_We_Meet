import React from 'react';
import { CheckCircle2, PlusCircle } from 'lucide-react';

export interface CalendarProviderInfo {
  id: string;
  label: string;
  connected: boolean;
}

export const CalendarProviderStatusRow: React.FC<{ providers: CalendarProviderInfo[] }> = ({ providers }) => {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {providers.map(provider => (
        <div key={provider.id} className="flex items-center gap-1.5 bg-white border border-ink-line px-3 py-1.5 rounded-full whitespace-nowrap">
          {provider.connected ? (
            <>
              <CheckCircle2 size={14} className="text-success" />
              <span className="text-xs font-bold text-ink-muted">{provider.label} 연결됨</span>
            </>
          ) : (
            <>
              <PlusCircle size={14} className="text-ink-hint" />
              <span className="text-xs font-bold text-ink-hint">{provider.label} 연결 필요</span>
            </>
          )}
        </div>
      ))}
    </div>
  );
};
