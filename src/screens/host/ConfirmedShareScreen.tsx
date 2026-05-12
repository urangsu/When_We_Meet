import React from 'react';
import { Button } from '../../components/Button';
import { ChevronLeft, Share2, CalendarPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ScreenShell } from '../../components/layout/ScreenShell';
import { BottomCTA } from '../../components/layout/BottomCTA';
import { Card } from '../../components/Card';
import { InitialAvatarGroup } from '../../components/profile/InitialAvatarGroup';
import { mockMeetings } from '../../data/mockMeetings';
import { useCreateMeetingDraft } from '../../state/CreateMeetingDraftContext';
import { getActivityLabels, getActivityDisplayText } from '../../utils/activity';

export const ConfirmedShareScreen = () => {
  const navigate = useNavigate();
  const { draft } = useCreateMeetingDraft();

  const handleShare = () => {
    window.alert('카톡/DM으로 공유하기는 준비 중이에요.');
  };

  const handleCalendar = () => {
    window.alert('캘린더에 추가하기는 준비 중이에요.');
  };

  // Mock data for preview fallback
  const meeting = mockMeetings[0];

  const title = draft.title || meeting.title;
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

  const activityDisplay = draft.activityIds.length > 0 
    ? getActivityDisplayText(draft.activityIds, draft.customActivity)
    : '맛있는 거 먹기 · 카페 가기';

  return (
    <ScreenShell withBottomNav hasBottomCTA className="gap-6 bg-bg-app">
      <header className="flex flex-col gap-2 pt-2 px-5">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/app')} className="p-2 -ml-2"><ChevronLeft size={24}/></button>
          <h1 className="font-bold text-2xl">모임이 확정됐어요!</h1>
        </div>
        <p className="text-ink-muted text-sm px-1">
          친구들에게 확정 카드를 공유해보세요.
        </p>
      </header>

      <div className="px-5 flex flex-col items-center pb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Preview Card */}
        <div className="w-full max-w-[320px] bg-white rounded-[32px] p-8 shadow-warm border border-rose/20 relative overflow-hidden flex flex-col items-center text-center gap-6 mt-4">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-rose-light via-rose to-rose-deep opacity-50" />
          
          <div className="flex flex-col gap-2 items-center w-full mt-2">
            <h2 className="text-xl font-black text-ink">{title}</h2>
            <div className="px-3 py-1 bg-rose-light/50 text-rose-deep text-xs font-bold rounded-full">
              모임이 확정되었어요
            </div>
          </div>

          <div className="flex flex-col items-center gap-1">
            <span className="text-xl font-black text-rose">{dateDisplay}</span>
            <span className="font-bold text-ink">{timeDisplay}</span>
          </div>

          <div className="flex flex-col items-center w-full gap-3 mt-2">
            <div className="flex w-full bg-bg-app rounded-xl p-3 items-center justify-between gap-4">
              <span className="text-xs font-bold text-ink-hint whitespace-nowrap">장소</span>
              <span className="text-sm font-bold text-ink text-right">{placeDisplay}</span>
            </div>
            <div className="flex w-full bg-bg-app rounded-xl p-3 items-center justify-between gap-4">
              <span className="text-xs font-bold text-ink-hint whitespace-nowrap">할 것</span>
              <span className="text-sm font-bold text-ink text-right break-words min-w-0 max-w-[150px]">{activityDisplay}</span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 mt-2">
            <span className="text-xs font-bold text-ink-muted mb-1">함께하는 사람들</span>
            <InitialAvatarGroup participants={meeting.participants} totalCount={meeting.guests} maxVisible={3} />
          </div>
        </div>
      </div>

      <BottomCTA withBottomNav>
        <div className="flex flex-col gap-3 w-full">
          <Button 
            onClick={handleShare}
            size="full"
            className="flex items-center justify-center gap-2"
          >
            <Share2 size={18} />
            카톡/DM으로 공유하기
          </Button>
          <Button 
            onClick={handleCalendar}
            variant="secondary"
            size="full"
            className="flex items-center justify-center gap-2 border bg-white"
          >
            <CalendarPlus size={18} />
            캘린더에 추가하기
          </Button>
        </div>
      </BottomCTA>
    </ScreenShell>
  );
};
