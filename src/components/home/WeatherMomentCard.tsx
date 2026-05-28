import React from 'react';
import { WeatherIcon } from './WeatherIcon';

export interface WeatherMomentCardProps {
  condition: 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'hot' | 'cold' | 'unknown';
  conditionLabel: string;
  shortForecast: string;
  suggestion: string;
  scheduleLine?: string;
  compact?: boolean;
}

export const WeatherMomentCard = ({
  condition,
  conditionLabel,
  shortForecast,
  suggestion,
  scheduleLine,
  compact = false,
}: WeatherMomentCardProps) => {
  if (compact) {
    return (
      <article className="rounded-[24px] border border-white/70 bg-white/90 p-4 shadow-sm h-full flex flex-col justify-between">
        <div className="flex items-center gap-3">
          <div className="scale-75 origin-top-left -ml-2 -mt-2">
            <WeatherIcon condition={condition} />
          </div>
          <div>
            <h2 className="text-lg font-black text-ink leading-tight">{conditionLabel}</h2>
            <p className="text-xs text-ink-muted truncate">{shortForecast}</p>
          </div>
        </div>
        <p className="mt-2 text-xs font-medium text-ink-hint line-clamp-2 leading-relaxed">
          {suggestion}
        </p>
      </article>
    );
  }

  return (
    <article className="rounded-[28px] border border-white/70 bg-white/90 p-5 shadow-soft">
      <div className="flex items-center gap-4">
        <WeatherIcon condition={condition} />
        <div>
          <p className="text-[11px] font-bold text-rose mb-0.5">오늘의 약속 날씨</p>
          <h2 className="text-xl font-black text-ink">{conditionLabel}</h2>
          <p className="mt-0.5 text-sm text-ink-muted">{shortForecast}</p>
        </div>
      </div>

      <p className="mt-4 rounded-2xl bg-bg-app px-4 py-3 text-sm font-medium leading-relaxed text-ink shadow-[inset_0_1px_3px_rgba(0,0,0,0.02)]">
        {suggestion}
      </p>

      {scheduleLine && (
        <div className="mt-4 border-t border-line pt-3 text-xs font-semibold text-ink-hint flex items-center before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-[#FFD56A] before:mr-2">
          {scheduleLine}
        </div>
      )}
    </article>
  );
};
