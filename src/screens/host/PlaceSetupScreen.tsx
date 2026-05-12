import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ScreenShell } from '../../components/layout/ScreenShell';
import { BottomCTA } from '../../components/layout/BottomCTA';
import { locationModeOptions } from '../../config/locationOptions';
import type { LocationMode } from '../../types/meeting';

export const PlaceSetupScreen = () => {
  const navigate = useNavigate();
  const [selectedMode, setSelectedMode] = useState<LocationMode | null>(null);
  const [fixedPlace, setFixedPlace] = useState('');

  const isValid = selectedMode !== null && (selectedMode !== 'fixed' || fixedPlace.trim().length > 0);

  return (
    <ScreenShell withBottomNav hasBottomCTA className="gap-8">
      <header className="flex flex-col gap-2 pt-2">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2"><ChevronLeft size={24}/></button>
          <h1 className="font-bold text-2xl">어디서 만날까요?</h1>
        </div>
        <p className="text-ink-muted text-sm px-1">
          장소를 정해도 되고, 친구들에게 후보를 받아도 좋아요.
        </p>
      </header>

      <div className="flex flex-col gap-3">
        {locationModeOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => !option.disabled && setSelectedMode(option.id as LocationMode)}
            disabled={option.disabled}
            className={`
              flex flex-col gap-1 p-5 rounded-2xl border text-left transition-all
              ${selectedMode === option.id 
                ? 'border-rose bg-rose-light/30 ring-1 ring-rose' 
                : option.disabled 
                  ? 'border-ink-line/50 bg-bg-app opacity-50 cursor-not-allowed'
                  : 'border-ink-line bg-white active:bg-bg-app'
              }
            `}
          >
            <div className="flex items-center justify-between">
              <span className={`font-bold ${selectedMode === option.id ? 'text-rose-deep' : 'text-ink'}`}>
                {option.title}
              </span>
              {selectedMode === option.id && (
                <div className="w-4 h-4 rounded-full bg-rose border-4 border-rose-light" />
              )}
            </div>
            <span className={`text-sm ${selectedMode === option.id ? 'text-rose-deep/80' : 'text-ink-hint'}`}>
              {option.description}
            </span>
          </button>
        ))}

        {selectedMode === 'fixed' && (
          <div className="flex flex-col gap-2 mt-4 animate-in fade-in slide-in-from-top-2">
            <label className="text-sm font-bold text-ink ml-1">장소 이름</label>
            <input 
              value={fixedPlace}
              onChange={(e) => setFixedPlace(e.target.value)}
              placeholder="예) 성수동 조용한 카페"
              className="w-full p-4 rounded-2xl border border-ink-line focus:border-rose focus:outline-none focus:shadow-sm transition-all"
            />
          </div>
        )}
      </div>

      <BottomCTA withBottomNav>
        <Button 
          disabled={!isValid} 
          onClick={() => navigate('/app/create/dates')} 
          size="full"
        >
          다음 · 날짜 고르기
        </Button>
      </BottomCTA>
    </ScreenShell>
  );
};
