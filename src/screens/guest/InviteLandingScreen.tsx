import React from 'react';
import { Button } from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { ScreenShell } from '../../components/layout/ScreenShell';
import { BottomCTA } from '../../components/layout/BottomCTA';
import { CalendarCheck, ChevronLeft, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { getInviteRoute } from '../../utils/inviteRoutes';
import { useGuestInvite } from '../../state/GuestInviteContext';

export const InviteLandingScreen = () => {
  const navigate = useNavigate();
  const { meetingId, token, loadState, meeting } = useGuestInvite();

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
    return <ScreenShell className="items-center justify-center p-5 text-center">초대장이 유효하지 않아요.</ScreenShell>;
  }

  const title = meeting?.title || '수민이의 생일 모임';
  const message = meeting?.hostMessage || '같이 시간 맞춰볼까요?\n가능한 날짜와 하고 싶은 걸 가볍게 골라주세요.';

  return (
    <ScreenShell hasBottomCTA className="gap-6 items-center justify-center p-5 bg-transparent">
      
      <button
        onClick={handleBack}
        className="absolute left-5 top-5 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 border border-line shadow-soft text-ink"
        aria-label="뒤로가기"
      >
        <ChevronLeft size={20} />
      </button>

      <motion.div 
        className="w-full flex justify-center mb-[-12px] z-10"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, delay: 0.1 }}
      >
        <div className="bg-surface-warm shadow-soft border border-line rounded-full px-4 py-1.5 text-xs font-bold text-ink-muted">
          초대장이 도착했어요
        </div>
      </motion.div>

      <motion.div 
        className="w-full max-w-sm rounded-2xl p-8 flex flex-col items-center text-center shadow-warm relative overflow-hidden bg-gradient-to-br from-[#FFF7F2] to-[#FFE9EE] border border-primary/10 mt-2 mb-auto"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28 }}
      >
        <div className="flex flex-col gap-5 items-center z-10 my-6">
          <div className="h-14 w-14 shrink-0 rounded-full bg-white shadow-sm border border-primary/20 flex items-center justify-center mb-2">
            <CalendarCheck size={28} className="text-primary" />
          </div>

          <h2 className="font-bold text-2xl leading-tight text-ink">
            {title}
          </h2>
          
          <p className="text-sm font-medium text-ink-muted leading-relaxed whitespace-pre-line">
            {message}
          </p>
        </div>
      </motion.div>

      <BottomCTA>
        <motion.div
           initial={{ opacity: 0, y: 12 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.28, delay: 0.2 }}
           className="w-full"
        >
          <Button onClick={() => navigate(getInviteRoute({ meetingId, token }, 'attendance'))} size="full">
            초대장 열어보기
          </Button>
        </motion.div>
      </BottomCTA>
    </ScreenShell>
  );
};
