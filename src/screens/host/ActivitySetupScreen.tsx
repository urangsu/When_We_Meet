import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ScreenShell } from '../../components/layout/ScreenShell';
import { BottomCTA } from '../../components/layout/BottomCTA';
import { activityOptions } from '../../config/activityOptions';
import { Chip } from '../../components/Card';
import { useCreateMeetingDraft } from '../../state/CreateMeetingDraftContext';
import type { ActivityOptionId } from '../../types/meeting';
import { getCalendarMemoRecommendations } from '../../utils/calendarMemoRecommendations';
import { useTutorialMode } from '../../hooks/useTutorialMode';
import { TutorialHint } from '../../components/onboarding/TutorialHint';

export const ActivitySetupScreen = () => {
  const { isTutorial, skip } = useTutorialMode();
  const navigate = useNavigate();
  const { draft, updateDraft } = useCreateMeetingDraft();
  const [selectedActivities, setSelectedActivities] = useState<ActivityOptionId[]>(draft.activityIds);
  const [customActivity, setCustomActivity] = useState(draft.customActivity || '');

  const recommendations = getCalendarMemoRecommendations({
    notes: draft.attachedCalendarMemoNotes,
    tags: draft.attachedCalendarMemoTags,
  });

  const activityRecommendations = recommendations.filter((item) => item.type === 'activity');

  const toggleActivity = (id: ActivityOptionId) => {
    setSelectedActivities((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isCustomSelected = selectedActivities.includes('custom');
  const isValid = !isCustomSelected || customActivity.trim().length > 0;

  const handleNext = () => {
    updateDraft({
      activityIds: selectedActivities,
      customActivity: selectedActivities.includes('custom') ? customActivity.trim() : '',
    });
    navigate('/app/create/theme');
  };

  return (
    <ScreenShell bottomInset="cta" className="gap-8">
      {isTutorial && (
        <TutorialHint
          step="5/6"
          title="만나서 뭐 할까요?"
          body="식사, 카페, 산책처럼 가볍게 골라주세요."
          onSkip={skip}
        />
      )}
      <header className="flex flex-col gap-2 pt-2">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2"><ChevronLeft size={24}/></button>
          <h1 className="font-bold text-2xl">만나서 뭐 할까요?</h1>
        </div>
        <p className="text-ink-muted text-sm px-1">
          가볍게 골라두면 친구들이 모임 분위기를 더 쉽게 알 수 있어요.
        </p>
      </header>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <label className="text-sm font-bold text-ink ml-1">뭐 할지 골라두기</label>
          <div className="flex flex-wrap gap-2">
            {activityOptions.map((opt) => (
              <Chip
                key={opt.id}
                selected={selectedActivities.includes(opt.id)}
                onClick={() => toggleActivity(opt.id)}
              >
                {opt.label}
              </Chip>
            ))}
          </div>
          
          {activityRecommendations.length > 0 && (
            <div className="bg-white border border-rose-light/50 rounded-2xl p-4 mt-2">
              <p className="text-xs font-bold text-rose mb-3">달력 기록 기반 활동 힌트</p>
              <div className="flex flex-wrap gap-2">
                {activityRecommendations.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => {
                      setCustomActivity(item.label);
                      setSelectedActivities((prev) =>
                        prev.includes('custom') ? prev : [...prev, 'custom']
                      );
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

        {isCustomSelected && (
          <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-top-2">
            <label className="text-sm font-bold text-ink ml-1">직접 입력</label>
            <input 
              value={customActivity}
              onChange={(e) => setCustomActivity(e.target.value)}
              placeholder="예) 보드게임 가기"
              className="w-full p-4 rounded-2xl border border-ink-line focus:border-rose focus:outline-none focus:shadow-sm transition-all"
            />
          </div>
        )}
      </div>

      <BottomCTA>
        <Button 
          disabled={!isValid}
          onClick={handleNext} 
          size="full"
        >
          다음 · 테마 고르기
        </Button>
      </BottomCTA>
    </ScreenShell>
  );
};
