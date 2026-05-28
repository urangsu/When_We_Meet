import React from 'react';

export interface WeatherIconProps {
  condition: 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'hot' | 'cold' | 'unknown';
}

export const WeatherIcon = ({ condition }: WeatherIconProps) => {
  switch (condition) {
    case 'sunny':
      return (
        <div className="relative h-16 w-16 flex-shrink-0">
          <div className="absolute inset-2 rounded-full bg-[#FFD56A] shadow-[0_8px_24px_rgba(255,190,80,0.28)]" />
          <div className="absolute left-6 top-6 h-1 w-1 rounded-full bg-[#8A5A28]" />
          <div className="absolute right-6 top-6 h-1 w-1 rounded-full bg-[#8A5A28]" />
          <div className="absolute left-1/2 top-9 h-1 w-3 -translate-x-1/2 rounded-full bg-[#8A5A28]/50" />
        </div>
      );
    case 'cloudy':
      return (
        <div className="relative h-16 w-16 flex-shrink-0">
          <div className="absolute top-4 left-2 h-8 w-8 rounded-full bg-slate-300" />
          <div className="absolute top-2 left-6 h-10 w-10 rounded-full bg-slate-200 shadow-[0_8px_24px_rgba(148,163,184,0.3)]" />
          <div className="absolute top-4 right-2 h-8 w-8 rounded-full bg-slate-300" />
          <div className="absolute left-6 top-6 h-1 w-1 rounded-full bg-slate-600" />
          <div className="absolute right-6 top-6 h-1 w-1 rounded-full bg-slate-600" />
          <div className="absolute left-1/2 top-9 h-1 w-3 -translate-x-1/2 rounded-full bg-slate-500" />
        </div>
      );
    case 'rainy':
      return (
        <div className="relative h-16 w-16 flex-shrink-0">
          <div className="absolute top-2 left-4 h-10 w-10 rounded-full bg-[#8196E6] shadow-[0_8px_24px_rgba(129,150,230,0.4)]" />
          <div className="absolute top-10 left-6 h-3 w-1 rounded-full bg-[#A3B8FF]" />
          <div className="absolute top-12 left-9 h-3 w-1 rounded-full bg-[#A3B8FF]" />
          <div className="absolute left-6 top-5 h-1 w-1 rounded-full bg-[#3B4D99]" />
          <div className="absolute right-6 top-5 h-1 w-1 rounded-full bg-[#3B4D99]" />
        </div>
      );
    case 'snowy':
    case 'hot':
    case 'cold':
    case 'unknown':
    default:
      return (
        <div className="relative h-16 w-16 flex-shrink-0 flex items-center justify-center">
          <div className="absolute inset-2 rounded-full bg-slate-200" />
          <div className="absolute left-6 top-6 h-1 w-1 rounded-full bg-slate-500" />
          <div className="absolute right-6 top-6 h-1 w-1 rounded-full bg-slate-500" />
          <div className="absolute left-1/2 top-9 h-1 w-3 -translate-x-1/2 rounded-full bg-slate-400" />
        </div>
      );
  }
};
