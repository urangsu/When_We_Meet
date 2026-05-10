import React from 'react';
import { Button } from '../components/Button';
import { motion } from 'motion/react';
import { Check, Heart, ArrowLeft, Plus } from 'lucide-react';

export const ResponseCompleteScreen = ({ onReset, onBackToInvite }: { onReset: () => void, onBackToInvite: () => void }) => {
  return (
    <div className="flex flex-col gap-8 h-full items-center justify-center text-center">
      <motion.div 
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', damping: 12 }}
        className="w-24 h-24 bg-rose text-white rounded-[32px] flex items-center justify-center shadow-warm mb-4"
      >
        <Heart size={48} fill="white" />
      </motion.div>

      <div className="flex flex-col gap-3">
        <h1 className="hero-title text-3xl">응답이 완료되었어요!</h1>
        <p className="text-ink-muted font-medium px-8 leading-relaxed">
          수민님께 소중한 응답을 전달했습니다.<br/>모임 확정 시 알림을 보내드릴게요!
        </p>
      </div>

      <div className="w-full mt-8 flex flex-col gap-3 pb-10">
        <Button onClick={onReset} size="full">
          <Plus size={20}/> 나도 모임 만들어보기
        </Button>
        <Button variant="ghost" onClick={onBackToInvite} className="flex items-center gap-2">
          <ArrowLeft size={18}/> 초대장으로 돌아가기
        </Button>
      </div>
    </div>
  );
};
