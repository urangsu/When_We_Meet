import React from 'react';
import { Button } from '../Button';
import { InvitationOpeningMotion } from '../invite/InvitationOpeningMotion';

interface WelcomeInviteOverlayProps {
  onStartTutorial: () => void;
  onSkip: () => void;
}

export const WelcomeInviteOverlay: React.FC<WelcomeInviteOverlayProps> = ({ onStartTutorial, onSkip }) => {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg-app">
      <InvitationOpeningMotion
        title="When We Meet에 오신 걸 환영해요."
        preview={true}
        variant="envelope"
        onComplete={() => {}}
      />
      
      <div className="absolute top-[60%] left-0 right-0 px-6 text-center space-y-4">
        <p className="text-sm text-ink-hint leading-relaxed">
          When We Meet에 오신 걸 환영해요.<br/>
          여기서는 약속을 날짜만 묻지 않고,<br/>
          언제, 어디서, 뭘 할지까지<br/>
          하나의 초대장으로 정리할 수 있어요.
        </p>
        
        <div className="flex flex-col gap-2">
            <Button onClick={onStartTutorial} size="full">첫 초대장 만들어보기</Button>
            <Button onClick={onSkip} variant="ghost" size="full">스킵하고 둘러보기</Button>
        </div>
      </div>
    </div>
  );
};
