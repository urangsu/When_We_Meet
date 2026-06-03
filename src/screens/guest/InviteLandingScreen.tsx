import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { ScreenShell } from '../../components/layout/ScreenShell';
import { BottomCTA } from '../../components/layout/BottomCTA';
import { CalendarCheck, ChevronLeft, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { getInviteRoute } from '../../utils/inviteRoutes';
import { useGuestInvite } from '../../state/GuestInviteContext';
import { InvitationOpeningMotion } from '../../components/invite/InvitationOpeningMotion';

export const InviteLandingScreen = () => {
  const navigate = useNavigate();
  const { meetingId, token, loadState, meeting } = useGuestInvite();
  const [introDone, setIntroDone] = useState(false);

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }
    navigate('/app');
  };

  if (loadState === 'loading') {
    return <ScreenShell className="items-center justify-center"><Loader2 className="animate-spin text-primary" size={32}/></ScreenShell>;
  }

  if (loadState === 'invalid') {
    return (
      <ScreenShell className="items-center justify-center p-5 bg-bg-app">
        <div className="w-full max-w-sm rounded-[24px] p-8 flex flex-col items-center text-center shadow-soft relative overflow-hidden bg-white mt-12 mb-auto border border-line">
          <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-6 border border-line">
            <span className="text-3xl">📭</span>
          </div>
          <h2 className="font-bold text-xl leading-tight text-ink mb-4">
            초대장을 열 수 없어요
          </h2>
          <div className="flex flex-col gap-2 text-sm text-ink-muted text-left w-full bg-slate-50 p-4 rounded-xl">
            <span className="font-bold text-ink-hint text-xs mb-1">가능한 이유:</span>
            <p>• 링크가 일부 잘못 복사되었거나</p>
            <p>• 초대장이 만료되었거나</p>
            <p>• 호스트가 초대장을 닫았어요.</p>
          </div>
          <p className="text-sm font-medium text-ink-hint mt-6">
            다시 링크를 확인하시거나,<br/>초대한 사람에게 새 링크를 요청해 주세요.
          </p>
        </div>
        <div className="w-full mt-auto justify-end pb-8">
          <Button onClick={() => navigate('/app')} size="full" variant="outline" className="bg-white">
            홈으로 가기
          </Button>
        </div>
      </ScreenShell>
    );
  }

  const title = meeting?.title || '새로운 초대장';
  const message = meeting?.hostMessage || '같이 시간 맞춰볼까요?\n가능한 날짜와 하고 싶은 걸 가볍게 골라주세요.';
  const dateLabel = meeting?.dateLabels?.length ? meeting.dateLabels.length + '개의 날짜 후보' : undefined;
  
  let placeLabel = undefined;
  if (meeting?.locationMode === 'fixed' && meeting.fixedPlaceName) {
    placeLabel = meeting.fixedPlaceName;
  } else if (meeting?.locationMode === 'candidate_vote') {
    placeLabel = '친구들과 함께 결정';
  }

  let activityLabel = undefined;
  if (meeting?.activityMode === 'decided' && (meeting.activityIds?.length || meeting.customActivity)) {
    activityLabel = meeting.activityIds?.length ? meeting.activityIds.length + '개의 후보' : meeting.customActivity;
  } else if (meeting?.activityMode === 'vote') {
    activityLabel = '친구들과 함께 결정';
  }

  if (!introDone) {
    return (
      <InvitationOpeningMotion
        title={title}
        hostName={meeting?.hostName}
        message={message}
        dateLabel={dateLabel}
        placeLabel={placeLabel}
        activityLabel={activityLabel}
        themeId={meeting?.themeId}
        onComplete={() => setIntroDone(true)}
      />
    );
  }

  return (
    <ScreenShell hasBottomCTA className="gap-6 items-center justify-center p-5 bg-[#F4F1EA]">
      <button
        onClick={handleBack}
        className="absolute left-5 top-5 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 border border-line shadow-soft text-ink"
        aria-label="뒤로가기"
      >
        <ChevronLeft size={20} />
      </button>

      <motion.div 
        className="w-full flex justify-center mb-[-12px] z-10 mt-12"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.28, type: 'spring' }}
      >
        <div className="bg-white shadow-md border border-line rounded-full px-4 py-1.5 text-xs font-bold text-ink">
          {meeting?.hostName ? `${meeting.hostName}님이 보낸 모임` : '새로운 모임'}
        </div>
      </motion.div>

      <motion.div 
        className="w-full max-w-sm rounded-[24px] p-8 flex flex-col items-center text-center shadow-xl relative overflow-hidden bg-white mt-2 mb-auto"
        initial={{ opacity: 0, y: 12, rotateX: -10 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex flex-col gap-5 items-center z-10 my-4 w-full">
          <div className="h-16 w-16 shrink-0 rounded-full bg-[#FFF0F0] flex items-center justify-center mb-2">
            <CalendarCheck size={32} className="text-rose" />
          </div>

          <h2 className="font-bold text-2xl leading-tight text-ink">
            {title}
          </h2>

          <div className="w-12 h-px bg-rose-200 my-2" />
          
          <p className="text-sm font-medium text-ink-muted leading-relaxed whitespace-pre-line">
            "{message}"
          </p>

          <div className="w-full bg-[#FAFAFA] rounded-xl p-4 flex flex-col gap-2 mt-4 border border-ink-line text-left">
            {dateLabel && (
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-ink-hint uppercase">언제</span>
                <span className="text-sm font-medium text-ink">{dateLabel}</span>
              </div>
            )}
            {placeLabel && (
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-ink-hint uppercase">어디서</span>
                <span className="text-sm font-medium text-ink">{placeLabel}</span>
              </div>
            )}
            {activityLabel && (
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-ink-hint uppercase">뭐 할까</span>
                <span className="text-sm font-medium text-ink">{activityLabel}</span>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      <BottomCTA>
        <motion.div
           initial={{ opacity: 0, y: 12 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.28, delay: 0.1 }}
           className="w-full"
        >
          <Button onClick={() => navigate(getInviteRoute({ meetingId, token }, 'attendance'))} size="full" className="shadow-lg shadow-rose-200">
            응답 시작하기
          </Button>
        </motion.div>
      </BottomCTA>
    </ScreenShell>
  );
};
