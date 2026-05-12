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

export const ActivitySetupScreen = () => {
  const navigate = useNavigate();
  const { draft, updateDraft } = useCreateMeetingDraft();
  const [selectedActivities, setSelectedActivities] = useState<ActivityOptionId[]>(draft.activityIds);
  const [customActivity, setCustomActivity] = useState(draft.customActivity || '');

  const toggleActivity = (id: ActivityOptionId) => {
    setSelectedActivities((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isCustomSelected = selectedActivities.includes('custom');

  const handleNext = () => {
    updateDraft({
      activityIds: selectedActivities,
      customActivity: selectedActivities.includes('custom') ? customActivity.trim() : '',
    });
    navigate('/app/create/theme');
  };

  return (
    <ScreenShell withBottomNav hasBottomCTA className="gap-8">
      <header className="flex flex-col gap-2 pt-2">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2"><ChevronLeft size={24}/></button>
          <h1 className="font-bold text-2xl">만나서 뭐 하고 싶어요?</h1>
        </div>
        <p className="text-ink-muted text-sm px-1">
          식사, 카페, 산책처럼 가볍게 골라두면 초대장이 더 자연스러워져요.
        </p>
      </header>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <label className="text-sm font-bold text-ink ml-1">하고 싶은 것 (여러 개 가능)</label>
          <div className="flex flex-wrap gap-2">
            {activityOptions.map((opt) => (
              <Chip
                key={opt.id}
                selected={selectedActivities.includes(opt.id as ActivityOptionId)}
                onClick={() => toggleActivity(opt.id as ActivityOptionId)}
              >
                {opt.label}
              </Chip>
            ))}
          </div>
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

      <BottomCTA withBottomNav>
        <Button 
          onClick={handleNext} 
          size="full"
        >
          다음 · 테마 고르기
        </Button>
      </BottomCTA>
    </ScreenShell>
  );
};
