import React from 'react';
import { WeatherImage, type WeatherCondition } from './WeatherImage';

export interface WeatherMomentCardProps {
  condition: WeatherCondition;
  conditionLabel: string;
  shortForecast: string;
  suggestion: string;
  scheduleLine?: string;
  compact?: boolean;
  locationLabel?: string;
  onRefreshLocation?: () => void;
  isRefreshing?: boolean;
}

export const WeatherMomentCard = ({
  condition,
  conditionLabel,
  shortForecast,
  suggestion,
  scheduleLine,
  compact = false,
  locationLabel,
  onRefreshLocation,
  isRefreshing = false,
}: WeatherMomentCardProps) => {
  if (compact) {
    return (
      <article className="rounded-[24px] border border-white/70 bg-white/90 p-4 shadow-sm h-full flex flex-col justify-between">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="scale-75 origin-top-left -ml-2 -mt-2">
              <WeatherImage condition={condition} size="md" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-lg font-black text-ink leading-tight">{conditionLabel}</h2>
                {locationLabel && (
                  <span className="text-[9px] text-ink-hint font-medium">📍 {locationLabel}</span>
                )}
              </div>
              <p className="text-xs text-ink-muted truncate">{shortForecast}</p>
            </div>
          </div>
          {onRefreshLocation && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onRefreshLocation();
              }}
              disabled={isRefreshing}
              className="p-1.5 text-ink-hint hover:text-rose hover:bg-rose-50 rounded-full transition-colors cursor-pointer shrink-0"
            >
              <svg 
                className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-rose' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 16H18" />
              </svg>
            </button>
          )}
        </div>
        <p className="mt-2 text-xs font-medium text-ink-hint line-clamp-2 leading-relaxed">
          {suggestion}
        </p>
      </article>
    );
  }

  return (
    <article className="rounded-[28px] border border-white/70 bg-white/90 p-5 shadow-soft">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <WeatherImage condition={condition} size="lg" />
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <p className="text-[11px] font-bold text-rose">오늘의 약속 날씨</p>
              {locationLabel && (
                <span className="inline-flex items-center gap-1 text-[9px] font-bold text-rose bg-rose-50 px-1.5 py-0.5 rounded-full border border-rose-100/40 animate-in fade-in duration-300">
                  📍 {locationLabel}
                </span>
              )}
            </div>
            <h2 className="text-xl font-black text-ink">{conditionLabel}</h2>
            <p className="mt-0.5 text-sm text-ink-muted">{shortForecast}</p>
          </div>
        </div>
        {onRefreshLocation && (
          <button 
            onClick={onRefreshLocation}
            disabled={isRefreshing}
            className="p-2 text-ink-hint hover:text-rose hover:bg-rose-50 rounded-full transition-colors cursor-pointer shrink-0 active:scale-95 transition-transform"
            title="현재 위치 날씨로 업데이트"
          >
            <svg 
              className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-rose' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 16H18" />
            </svg>
          </button>
        )}
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
