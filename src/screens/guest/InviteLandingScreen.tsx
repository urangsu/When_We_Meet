import React from 'react';
import { Button } from '../../components/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { ScreenShell } from '../../components/layout/ScreenShell';
import { BottomCTA } from '../../components/layout/BottomCTA';
import { CalendarCheck, ChevronLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { getInviteRoute } from '../../utils/inviteRoutes';

export const InviteLandingScreen = () => {
  const navigate = useNavigate();
  const { meetingId, token } = useParams();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }
    navigate('/app');
  };

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
          수민님이 보낸 초대장
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
            수민이의 생일 모임
          </h2>
          
          <p className="text-sm font-medium text-ink-muted leading-relaxed">
            같이 시간 맞춰볼까요?<br/>가능한 날짜와 하고 싶은 걸 가볍게 골라주세요.
          </p>
        </div>

        <div className="z-10 w-full flex flex-col gap-2 mt-4 bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-sm">
          <div className="flex justify-between items-center text-sm">
            <span className="font-bold text-ink-hint">날짜 후보</span>
            <span className="font-bold text-ink-muted text-right">6월 21일 (토) 등 2개</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="font-bold text-ink-hint">만나는 곳</span>
            <span className="font-bold text-ink-muted text-right">후보 받는 중</span>
          </div>
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
