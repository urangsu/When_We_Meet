import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { ChevronLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { ScreenShell } from '../../components/layout/ScreenShell';
import { BottomCTA } from '../../components/layout/BottomCTA';
import { activityOptions } from '../../config/activityOptions';
import { Chip } from '../../components/Card';
import { useGuestResponseDraft } from '../../state/GuestResponseDraftContext';
import { useGuestInvite } from '../../state/GuestInviteContext';
import type { ActivityOptionId } from '../../types/meeting';
import { getInviteRoute } from '../../utils/inviteRoutes';

export const GuestPlacePreferenceScreen = () => {
  const navigate = useNavigate();
  const { meetingId, token } = useParams();
  const { draft, updateResponseDraft } = useGuestResponseDraft();
  const { meeting } = useGuestInvite();

  const hostPlaceHint =
    meeting?.fixedPlaceName ||
    (meeting?.locationMode === 'candidate_vote'
      ? '친구들의 만날 곳 후보를 받을 예정이에요.'
      : '');
  const [candidates, setCandidates] = useState(draft?.placeCandidate || '');
  const [selectedActivities, setSelectedActivities] = useState<ActivityOptionId[]>(draft?.activityIds || []);
  const [customActivity, setCustomActivity] = useState(draft?.customActivity || '');

  const toggleActivity = (id: ActivityOptionId) => {
    setSelectedActivities((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isCustomSelected = selectedActivities.includes('custom');
  
  const isValid = !isCustomSelected || customActivity.trim().length > 0;

  const handleNext = () => {
    updateResponseDraft({
      placeCandidate: candidates.trim(),
      activityIds: selectedActivities,
      customActivity: isCustomSelected ? customActivity.trim() : '',
    });
    navigate(getInviteRoute({ meetingId, token }, 'preferences'));
  };

  return (
    <ScreenShell hasBottomCTA className="gap-8">
      <header className="flex flex-col gap-2 pt-2">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2"><ChevronLeft size={24}/></button>
          <h1 className="font-bold text-2xl">여기 어때요?</h1>
        </div>
        <p className="text-ink-muted text-sm px-1">
          가고 싶은 곳이나 하고 싶은 걸 가볍게 남겨주세요.
        </p>
      </header>

      <div className="flex flex-col gap-8">
        {hostPlaceHint && (
          <p className="text-xs font-medium text-ink-hint ml-1">
            호스트 메모: {hostPlaceHint}
          </p>
        )}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-ink ml-1">만날 곳 후보</label>
          <div className="relative">
            <textarea 
              value={candidates}
              onChange={(e) => setCandidates(e.target.value)}
              placeholder="예) 성수역 근처 카페, 한강공원, 조용한 식당"
              className="w-full p-4 rounded-2xl border border-ink-line focus:border-rose focus:outline-none focus:shadow-sm transition-all min-h-[100px] resize-none"
            />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <label className="text-sm font-bold text-ink ml-1">하고 싶은 것 선택</label>
          <div className="flex flex-wrap gap-2">
            {activityOptions.map((activity) => (
              <Chip
                key={activity.id}
                selected={selectedActivities.includes(activity.id)}
                onClick={() => toggleActivity(activity.id)}
              >
                {activity.label}
              </Chip>
            ))}
          </div>
          
          {isCustomSelected && (
            <div className="mt-2 animate-in fade-in slide-in-from-top-2">
               <input 
                  value={customActivity}
                  onChange={(e) => setCustomActivity(e.target.value)}
                  placeholder="직접 입력하세요"
                  className="w-full p-4 rounded-2xl border border-ink-line focus:border-rose focus:outline-none focus:shadow-sm transition-all"
                />
            </div>
          )}
        </div>
      </div>

      <BottomCTA>
        <Button 
          disabled={!isValid} 
          onClick={handleNext} 
          size="full"
        >
          다음 · 마지막으로
        </Button>
      </BottomCTA>
    </ScreenShell>
  );
};
