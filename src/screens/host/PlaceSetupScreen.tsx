import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ScreenShell } from '../../components/layout/ScreenShell';
import { BottomCTA } from '../../components/layout/BottomCTA';
import { locationModeOptions } from '../../config/locationOptions';
import type { LocationMode } from '../../types/meeting';
import { useCreateMeetingDraft } from '../../state/CreateMeetingDraftContext';
import { getCalendarMemoRecommendations } from '../../utils/calendarMemoRecommendations';
import { useTutorialMode } from '../../hooks/useTutorialMode';
import { TutorialHint } from '../../components/onboarding/TutorialHint';

export const PlaceSetupScreen = () => {
  const { isTutorial, skip } = useTutorialMode();
  const navigate = useNavigate();
  const { draft, updateDraft } = useCreateMeetingDraft();
  const [selectedMode, setSelectedMode] = useState<LocationMode>(draft.locationMode);
  const [fixedPlace, setFixedPlace] = useState(draft.fixedPlaceName || '');

  const recommendations = getCalendarMemoRecommendations({
    notes: draft.attachedCalendarMemoNotes,
    tags: draft.attachedCalendarMemoTags,
  });

  const placeRecommendations = recommendations.filter((item) => item.type === 'place');

  const isValid =
    selectedMode === 'undecided' ||
    selectedMode === 'candidate_vote' ||
    (selectedMode === 'fixed' && fixedPlace.trim().length > 0);

  const handleNext = () => {
    updateDraft({
      locationMode: selectedMode,
      fixedPlaceName: selectedMode === 'fixed' ? fixedPlace : '',
    });
    navigate('/app/create/dates');
  };

  return (
    <ScreenShell bottomInset="cta" className="gap-6">
      {isTutorial && (
        <TutorialHint
          step="4/6"
          title="만날 곳을 정해요"
          body="정해진 곳이 없어도 괜찮아요. 후보로 받아도 돼요."
          onSkip={skip}
        />
      )}
      <header className="flex flex-col gap-2 pt-2">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2"><ChevronLeft size={24}/></button>
          <h1 className="font-bold text-2xl">어디서 만날까요?</h1>
        </div>
        <p className="text-ink-muted text-sm px-1">
          만날 곳을 정해도 되고, 친구들에게 “여기 어때?”를 받아도 좋아요.
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
            <label className="text-sm font-bold text-ink ml-1">만날 곳</label>
            <input 
              value={fixedPlace}
              onChange={(e) => setFixedPlace(e.target.value)}
              placeholder="예) 성수동 조용한 카페"
              className="w-full p-4 rounded-2xl border border-ink-line focus:border-rose focus:outline-none focus:shadow-sm transition-all"
            />
            
            {placeRecommendations.length > 0 && (
              <div className="bg-white border border-rose-light/50 rounded-2xl p-4 mt-2">
                <p className="text-xs font-bold text-rose mb-3">달력 기록 기반 장소 힌트</p>
                <div className="flex flex-wrap gap-2">
                  {placeRecommendations.map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => {
                        setFixedPlace(item.label);
                      }}
                      className="px-3 py-1.5 bg-rose text-white text-xs font-semibold rounded-full shadow-soft whitespace-nowrap"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {selectedMode === 'candidate_vote' && (
          <div className="p-4 bg-bg-app rounded-xl text-sm text-ink-hint mt-2 animate-in fade-in slide-in-from-top-2">
            친구들이 초대장에서 만날 곳 후보를 추가하고 투표할 수 있어요.
          </div>
        )}

        {selectedMode === 'undecided' && (
          <div className="p-4 bg-bg-app rounded-xl text-sm text-ink-hint mt-2 animate-in fade-in slide-in-from-top-2">
            날짜를 먼저 정하고 나중에 만날 곳을 알려줄 수 있어요.
          </div>
        )}
      </div>

      <BottomCTA>
        <Button 
          disabled={!isValid} 
          onClick={handleNext} 
          size="full"
        >
          다음 · 날짜 고르기
        </Button>
      </BottomCTA>
    </ScreenShell>
  );
};
