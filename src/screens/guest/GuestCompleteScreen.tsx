import React from 'react';
import { Button } from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { Check, CalendarHeart } from 'lucide-react';
import { motion } from 'motion/react';

export const GuestCompleteScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-8 h-full items-center justify-center text-center p-5 pt-20">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-20 h-20 bg-rose rounded-full flex items-center justify-center text-white mb-4 shadow-warm"
      >
        <Check size={40} strokeWidth={3} />
      </motion.div>

      <div className="flex flex-col gap-3">
        <h1 className="font-bold text-3xl">응답이 완료되었어요!</h1>
        <p className="text-ink-muted font-medium px-4">호스트가 일정을 확정하면 다시 알려드릴게요.</p>
      </div>

      <div className="w-full bg-cream border border-ink-line rounded-2xl p-6 flex flex-col items-center gap-4 mt-8 shadow-sm">
        <CalendarHeart size={32} className="text-rose" />
        <p className="font-bold text-ink text-center">
          나도 친구들과의 약속을<br/>쉽게 잡고 싶다면?
        </p>
        <Button onClick={() => navigate('/app')} size="full" className="mt-2">
          우리 언제 만나 시작하기
        </Button>
      </div>
    </div>
  );
};
