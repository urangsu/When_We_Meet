import React from 'react';
import { Button } from '../components/Button';
import { ChevronLeft, PartyPopper, Calendar, Repeat, UserPlus } from 'lucide-react';
import { motion } from 'motion/react';

export const PostMeetingScreen = ({ onNext }: { onNext: (action: string) => void }) => {
  return (
    <div className="flex flex-col gap-10 h-full items-center justify-center text-center">
      <motion.div 
        animate={{ 
          y: [0, -10, 0],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ repeat: Infinity, duration: 3 }}
        className="w-24 h-24 bg-warning-bg text-warning rounded-full flex items-center justify-center mb-4"
      >
        <PartyPopper size={48} />
      </motion.div>

      <div className="flex flex-col gap-3">
        <h1 className="hero-title text-3xl">모임은 재미있으셨나요?</h1>
        <p className="text-ink-muted font-medium px-4">오늘의 추억을 다음에도 이어가 보세요!</p>
      </div>

      <div className="w-full flex flex-col gap-4">
        <button 
          onClick={() => onNext('recurring')}
          className="w-full flex items-center justify-between p-6 bg-white border border-ink-line rounded-2xl group active:scale-95 transition-all text-left"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-rose-light text-rose rounded-2xl flex items-center justify-center">
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
          onClick={() => onNext('new')}
          className="w-full flex items-center justify-between p-6 bg-white border border-ink-line rounded-2xl group active:scale-95 transition-all text-left"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-success-bg text-success rounded-2xl flex items-center justify-center">
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

      <div className="mt-auto w-full pb-10">
        <Button variant="ghost" onClick={() => onNext('later')}>나중에 하기</Button>
      </div>
    </div>
  );
};
