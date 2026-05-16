import React from 'react';
import { motion } from 'motion/react';
import { Button } from '../Button';

interface WelcomeInviteOverlayProps {
  onStartTutorial: () => void;
  onSkip: () => void;
}

const WelcomeEnvelopeIllustration = () => {
    return (
      <div className="relative w-[220px] h-[150px]">
        <div className="absolute inset-x-0 bottom-0 h-[120px] rounded-b-3xl bg-white border border-rose/30 shadow-[0_18px_45px_rgba(180,85,95,0.16)]" />
  
        <svg viewBox="0 0 220 120" className="absolute inset-x-0 bottom-0 h-[120px] w-full z-20">
          <path d="M6 8 L110 68 L214 8" fill="none" stroke="rgba(180,85,95,0.72)" strokeWidth="1.6" />
          <path d="M6 114 L84 56" fill="none" stroke="rgba(180,85,95,0.34)" strokeWidth="1.6" />
          <path d="M214 114 L136 56" fill="none" stroke="rgba(180,85,95,0.34)" strokeWidth="1.6" />
        </svg>
  
        <motion.div
          initial={{ rotateX: 0 }}
          animate={{ rotateX: -16 }}
          transition={{ duration: 1.2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          style={{ transformOrigin: 'top center', transformPerspective: 900 }}
          className="absolute top-3 left-0 right-0 h-[68px] rounded-t-3xl bg-white border border-rose/30 z-30"
        />
  
        <div className="absolute left-1/2 top-[72px] -ml-3 z-40 h-6 w-6 rounded-full bg-rose shadow-soft" />
      </div>
    );
  };

export const WelcomeInviteOverlay: React.FC<WelcomeInviteOverlayProps> = ({ onStartTutorial, onSkip }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-[#F7F3EC] flex flex-col px-6 py-8">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onSkip}
          className="rounded-full bg-white/80 px-3 py-1.5 text-xs font-bold text-ink-muted border border-line"
        >
          스킵
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center gap-6">
        <p className="text-xs font-bold text-rose bg-white px-3 py-1.5 rounded-full shadow-soft">
          처음 받은 초대장
        </p>

        <WelcomeEnvelopeIllustration />

        <div className="space-y-3">
          <h1 className="text-2xl font-bold text-ink">초대장이 도착했어요</h1>
          <p className="text-sm text-ink-muted leading-relaxed">
            When We Meet에 오신 걸 환영해요.<br />
            약속을 날짜만 묻지 않고,<br />
            언제, 어디서, 뭘 할지까지<br />
            하나의 초대장으로 정리해요.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2 pb-4">
        <Button onClick={onStartTutorial} size="full">
          첫 초대장 만들어보기
        </Button>
        <Button onClick={onSkip} variant="ghost" size="full">
          스킵하고 둘러보기
        </Button>
      </div>
    </div>
  );
};
