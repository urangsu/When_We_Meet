import React from 'react';
import { Button } from '../Button';
import { InvitationOpeningMotion } from '../invite/InvitationOpeningMotion';

interface WelcomeInviteOverlayProps {
  onStartTutorial: () => void;
  onSkip: () => void;
}

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

        {/* Envelope Illustration Placeholder */}
        <div className="relative w-[180px] h-[120px] bg-white rounded-lg border border-rose/30 shadow-md">
            <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-12 h-12 bg-rose rounded-full opacity-20"></div>
            </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-2xl font-bold text-ink">초대장이 도착했어요</h1>
          <p className="text-sm text-ink-muted leading-relaxed">
            When We Meet에 오신 걸 환영해요.<br />
            약속을 날짜만 묻지 않고,<br />
            언제, 어디서, 뭘 할지까지<br />
            하나의 초대장으로 정리할 수 있어요.
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
