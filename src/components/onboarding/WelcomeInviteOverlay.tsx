import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '../Button';

interface WelcomeInviteOverlayProps {
  onStartTutorial: () => void;
  onSkip: () => void;
}

const WelcomeEnvelopeIllustration = ({ opened }: { opened: boolean }) => {
  return (
    <div className="relative h-[190px] w-[280px]">
      {/* inner card */}
      <motion.div
        initial={false}
        animate={{
          y: opened ? -34 : 22,
          opacity: opened ? 1 : 0,
          scale: opened ? 1 : 0.96,
        }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-8 right-8 bottom-14 z-10 rounded-3xl border border-rose/15 bg-[#FFFDF9] p-4 shadow-soft"
      >
        <p className="text-[10px] font-bold text-rose">WELCOME</p>
        <p className="mt-1 text-sm font-bold text-ink">우리의 첫 약속을<br />초대장으로</p>
      </motion.div>

      {/* envelope body */}
      <div className="absolute inset-x-0 bottom-0 h-[140px] w-full rounded-b-3xl bg-white border border-rose/30 shadow-[0_18px_45px_rgba(180,85,95,0.16)]" />

      {/* svg lines */}
      <svg viewBox="0 0 280 190" className="absolute inset-0 h-full w-full z-20">
        <path d="M6 8 L140 100 L274 8" fill="none" stroke="rgba(180,85,95,0.72)" strokeWidth="1.6" />
        <path d="M6 182 L106 108" fill="none" stroke="rgba(180,85,95,0.34)" strokeWidth="1.6" />
        <path d="M274 182 L174 108" fill="none" stroke="rgba(180,85,95,0.34)" strokeWidth="1.6" />
      </svg>

      {/* flap */}
      <motion.div
        initial={false}
        animate={{ rotateX: opened ? -148 : 0 }}
        transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: 'top center', transformPerspective: 900 }}
        className="absolute top-0 left-0 right-0 z-30 h-[98px] rounded-t-3xl bg-white border border-rose/30"
      />

      {/* seal */}
      <motion.div
        initial={false}
        animate={{ opacity: opened ? 0 : 1, scale: opened ? 0.7 : 1 }}
        className="absolute left-1/2 top-[88px] -ml-3 z-40 h-6 w-6 rounded-full bg-rose shadow-soft"
      />
    </div>
  );
};

export const WelcomeInviteOverlay: React.FC<WelcomeInviteOverlayProps> = ({ onStartTutorial, onSkip }) => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div className="fixed inset-0 z-[100] bg-[#F7F3EC] flex items-center justify-center px-4 py-6 overflow-hidden">
      <div className="relative flex h-full w-full max-w-[430px] flex-col rounded-[32px] bg-[#F7F3EC] md:h-[760px] md:max-h-[92vh] md:border md:border-white/70 md:shadow-[0_30px_90px_rgba(80,55,45,0.12)] overflow-hidden">
        
        <div className="flex justify-end p-6">
            <button
            type="button"
            onClick={onSkip}
            className="rounded-full bg-white/80 px-4 py-2 text-xs font-bold text-ink-muted border border-line"
            >
            스킵
            </button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center text-center gap-8 p-6">
          <p className="text-xs font-bold text-rose bg-white px-4 py-2 rounded-full shadow-soft">
            {isOpened ? 'When We Meet' : '처음 받은 초대장'}
          </p>

          <WelcomeEnvelopeIllustration opened={isOpened} />

          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-ink">
                {isOpened ? 'When We Meet에 오신 걸 환영해요.' : '초대장이 도착했어요'}
            </h1>
            <p className="text-sm text-ink-muted leading-relaxed">
              {isOpened 
                ? '약속을 날짜만 묻지 않고,\n언제, 어디서, 뭘 할지까지\n하나의 초대장으로 정리해요.' 
                : '약속을 더 설레게 정리하는 방법을\n짧게 보여드릴게요.'}
            </p>
          </div>
        </div>

        <div className="shrink-0 px-5 pb-[max(24px,env(safe-area-inset-bottom))]">
          <div className="mx-auto flex w-full max-w-[360px] flex-col gap-2">
            {isOpened ? (
              <>
                <Button onClick={onStartTutorial} size="full">
                  첫 초대장 만들어보기
                </Button>
                <Button onClick={onSkip} variant="ghost" size="full">
                  스킵하고 둘러보기
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsOpened(true)} size="full">
                초대장 열어보기
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
