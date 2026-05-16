import React, { useState } from 'react';
import { Button } from '../Button';
import { SignatureEnvelope } from '../invite/SignatureEnvelope';

interface WelcomeInviteOverlayProps {
  onStartTutorial: () => void;
  onSkip: () => void;
}

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

          <SignatureEnvelope
            opened={isOpened}
            variant="welcome"
            className="scale-[0.92] sm:scale-100"
          />

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
