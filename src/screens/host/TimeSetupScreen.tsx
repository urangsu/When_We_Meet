import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ScreenShell } from '../../components/layout/ScreenShell';
import { BottomCTA } from '../../components/layout/BottomCTA';
import { timeModeOptions, timeCandidateOptions } from '../../config/timeOptions';
import type { TimeMode } from '../../types/meeting';
import { Chip } from '../../components/Card';
import { useCreateMeetingDraft } from '../../state/CreateMeetingDraftContext';

export const TimeSetupScreen = () => {
  const navigate = useNavigate();
  const { draft, updateDraft } = useCreateMeetingDraft();
  const [selectedMode, setSelectedMode] = useState<TimeMode>(draft.timeMode);
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>(draft.timeLabels || []);

  const toggleCandidate = (time: string) => {
    if (selectedMode === 'fixed') {
      setSelectedCandidates([time]);
    } else {
      setSelectedCandidates((prev) => 
        prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]
      );
    }
  };

  const isValid = 
    selectedMode === 'undecided' || 
    selectedCandidates.length > 0;

  const handleNext = () => {
    updateDraft({
      timeMode: selectedMode,
      timeLabels: selectedMode === 'undecided' ? [] : selectedCandidates,
    });
    navigate('/app/create/activity');
  };

  return (
    <ScreenShell withBottomNav hasBottomCTA className="gap-8">
      <header className="flex flex-col gap-2 pt-2">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2"><ChevronLeft size={24}/></button>
          <h1 className="font-bold text-2xl">몇 시쯤 만날까요?</h1>
        </div>
        <p className="text-ink-muted text-sm px-1">
          시간을 미리 정하거나, 가능한 시간을 나중에 받아볼 수 있어요.
        </p>
      </header>

      <div className="flex flex-col gap-3">
        {timeModeOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => {
              setSelectedMode(option.id as TimeMode);
              if (option.id === 'undecided') {
                setSelectedCandidates([]);
              } else if (option.id === 'fixed' && selectedCandidates.length > 1) {
                setSelectedCandidates([selectedCandidates[0]]);
              }
            }}
            className={`
              flex flex-col gap-1 p-5 rounded-2xl border text-left transition-all
              ${selectedMode === option.id 
                ? 'border-rose bg-rose-light/30 ring-1 ring-rose' 
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

        {(selectedMode === 'fixed' || selectedMode === 'candidate_vote') && (
          <div className="flex flex-col gap-3 mt-4 animate-in fade-in slide-in-from-top-2">
            <label className="text-sm font-bold text-ink ml-1">
              {selectedMode === 'fixed' ? '시간 선택 (1개)' : '후보 선택 (여러 개 가능)'}
            </label>
            <div className="flex flex-wrap gap-2">
              {timeCandidateOptions.map((time) => (
                <Chip
                  key={time}
                  selected={selectedCandidates.includes(time)}
                  onClick={() => toggleCandidate(time)}
                >
                  {time}
                </Chip>
              ))}
            </div>
          </div>
        )}
      </div>

      <BottomCTA withBottomNav>
        <Button 
          disabled={!isValid} 
          onClick={handleNext} 
          size="full"
        >
          다음 · 할 것 고르기
        </Button>
      </BottomCTA>
    </ScreenShell>
  );
};
