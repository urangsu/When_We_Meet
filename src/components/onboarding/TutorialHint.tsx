import React from 'react';
import { Button } from '../Button';

interface TutorialHintProps {
  step: string;
  title: string;
  body: string;
  onSkip?: () => void;
  placement?: 'inline' | 'floating';
}

export const TutorialHint: React.FC<TutorialHintProps> = ({ 
  step, 
  title, 
  body, 
  onSkip,
  placement = 'inline' 
}) => {
  const content = (
    <div className="rounded-2xl border border-rose/20 bg-white/95 p-4 shadow-soft">
      <div className="flex justify-between items-start mb-2">
         <span className="text-[10px] font-bold text-rose bg-rose-50 px-2 py-0.5 rounded-full">{step}</span>
         {onSkip && <button onClick={onSkip} className="text-xs text-ink-hint underline">스킵</button>}
      </div>
      <h3 className="text-sm font-bold text-ink mb-1">{title}</h3>
      <p className="text-xs text-ink-muted leading-relaxed">{body}</p>
    </div>
  );

  if (placement === 'floating') {
    return (
      <div className="fixed inset-x-0 bottom-[96px] z-40 flex justify-center pointer-events-none">
        <div className="w-full max-w-[430px] px-5 pointer-events-none">
          <div className="pointer-events-auto">{content}</div>
        </div>
      </div>
    );
  }

  return content;
};
