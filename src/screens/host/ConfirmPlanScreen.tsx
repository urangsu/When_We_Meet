import React from 'react';
import { Button } from '../../components/Button';
import { ChevronLeft, Edit2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ScreenShell } from '../../components/layout/ScreenShell';
import { BottomCTA } from '../../components/layout/BottomCTA';
import { Card } from '../../components/Card';
import { useCreateMeetingDraft } from '../../state/CreateMeetingDraftContext';
import { getActivityDisplayItems } from '../../utils/activity';

export const ConfirmPlanScreen = () => {
  const navigate = useNavigate();
  const { draft } = useCreateMeetingDraft();

  // Helper to determine display formats based on current draft state.
  const dateDisplay = draft.dateLabels.length > 0 ? draft.dateLabels[0] : '6월 21일 (토)';
  
  let timeDisplay = '시간 미정';
  if (draft.timeMode === 'fixed' && draft.timeLabels.length > 0) {
    timeDisplay = draft.timeLabels[0];
  } else if (draft.timeMode === 'candidate_vote') {
    timeDisplay = '시간 투표 예정';
  }

  let placeDisplay = '장소 미정';
  if (draft.locationMode === 'fixed' && draft.fixedPlaceName) {
    placeDisplay = draft.fixedPlaceName;
  } else if (draft.locationMode === 'candidate_vote') {
    placeDisplay = '장소 후보 투표 예정';
  }

  const activityItems = draft.activityIds.length > 0 
    ? getActivityDisplayItems(draft.activityIds, draft.customActivity)
    : [];

  return (
    <ScreenShell withBottomNav hasBottomCTA className="gap-6 bg-bg-app">
      <header className="flex flex-col gap-2 pt-2 px-5">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2"><ChevronLeft size={24}/></button>
          <h1 className="font-bold text-2xl">이렇게 확정할까요?</h1>
        </div>
        <p className="text-ink-muted text-sm px-1">
          날짜, 시간, 장소, 하고 싶은 것을 한 번 더 확인해요.
        </p>
      </header>

      <div className="px-5 flex flex-col gap-4 pb-20">
        <Card className="flex flex-col gap-5 p-6">
          
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-bold text-ink-hint">날짜</span>
              <span className="font-semibold text-lg text-ink">{dateDisplay}</span>
            </div>
            <button onClick={() => navigate('/app/create/dates')} className="p-2 text-ink-hint hover:text-ink transition-colors bg-bg-app rounded-full"><Edit2 size={16} /></button>
          </div>
          
          <div className="h-px bg-ink-line/50 w-full" />
          
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-bold text-ink-hint">시간</span>
              <span className="font-semibold text-lg text-ink">{timeDisplay}</span>
            </div>
            <button onClick={() => navigate('/app/create/time')} className="p-2 text-ink-hint hover:text-ink transition-colors bg-bg-app rounded-full"><Edit2 size={16} /></button>
          </div>

          <div className="h-px bg-ink-line/50 w-full" />

          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-bold text-ink-hint">장소</span>
              <span className="font-semibold text-lg text-ink">{placeDisplay}</span>
            </div>
            <button onClick={() => navigate('/app/create/place')} className="p-2 text-ink-hint hover:text-ink transition-colors bg-bg-app rounded-full"><Edit2 size={16} /></button>
          </div>

          {activityItems.length > 0 && (
            <>
              <div className="h-px bg-ink-line/50 w-full" />
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-bold text-ink-hint">뭐 할지</span>
                  <div className="flex flex-col gap-1">
                    {activityItems.map((item, idx) => (
                      <span key={idx} className="font-semibold text-lg text-ink leading-tight">{item}</span>
                    ))}
                  </div>
                </div>
                <button onClick={() => navigate('/app/create/activity')} className="p-2 text-ink-hint hover:text-ink transition-colors bg-bg-app rounded-full"><Edit2 size={16} /></button>
              </div>
            </>
          )}

        </Card>
      </div>

      <BottomCTA withBottomNav>
        <Button 
          onClick={() => navigate('/app/meetings/demo/confirmed-share')} 
          size="full"
        >
          확정 카드 만들기
        </Button>
      </BottomCTA>
    </ScreenShell>
  );
};
