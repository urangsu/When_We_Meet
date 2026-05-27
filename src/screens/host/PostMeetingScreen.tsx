import React from 'react';
import { Button } from '../../components/Button';
import { ChevronLeft, PartyPopper, Calendar, Repeat, UserPlus } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ScreenShell } from '../../components/layout/ScreenShell';
import { BottomCTA } from '../../components/layout/BottomCTA';

export const PostMeetingScreen = () => {
  const navigate = useNavigate();

  return (
    <ScreenShell bottomInset="cta" className="gap-10 items-center justify-center text-center p-5 pt-20">
      <motion.div 
        animate={{ 
          y: [0, -10, 0],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ repeat: Infinity, duration: 3 }}
        className="w-24 h-24 bg-warning-bg border border-warning/20 text-warning rounded-full flex items-center justify-center mb-4"
      >
        <PartyPopper size={48} />
      </motion.div>

      <div className="flex flex-col gap-3">
        <h1 className="font-bold text-3xl">모임은 재미있으셨나요?</h1>
        <p className="text-ink-muted font-medium px-4">오늘의 추억을 다음에도 이어가 보세요!</p>
      </div>

      <div className="w-full flex flex-col gap-4">
        <button 
          onClick={() => navigate('/app/create/info')}
          className="w-full flex items-center justify-between p-6 bg-white border border-ink-line rounded-2xl group active:scale-95 transition-all text-left shadow-sm hover:border-rose"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-rose-light text-rose rounded-xl flex items-center justify-center">
              <Repeat size={24} />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg">정기모임으로 만들기</span>
              <span className="text-xs text-ink-hint">매주/매달 고정 모임으로 바로 전환</span>
            </div>
          </div>
          <ChevronLeft className="rotate-180 text-ink-hint" size={20} />
        </button>

        <button 
          onClick={() => navigate('/app/create/category')}
          className="w-full flex items-center justify-between p-6 bg-white border border-ink-line rounded-2xl group active:scale-95 transition-all text-left shadow-sm hover:border-success"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-success-bg text-success rounded-xl flex items-center justify-center">
              <Calendar size={24} />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg">다음 약속 만들기</span>
              <span className="text-xs text-ink-hint">새로운 주제로 다음 만남 기획</span>
            </div>
          </div>
          <ChevronLeft className="rotate-180 text-ink-hint" size={20} />
        </button>
      </div>

      <BottomCTA>
        <Button variant="ghost" onClick={() => navigate('/app')} size="full">나중에 하기</Button>
      </BottomCTA>
    </ScreenShell>
  );
};
