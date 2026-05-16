import React from 'react';
import { Button } from '../Button';

interface TutorialHintProps {
  step: string;
  title: string;
  body: string;
  onSkip?: () => void;
}

export const TutorialHint: React.FC<TutorialHintProps> = ({ step, title, body, onSkip }) => {
  return (
    <div className="fixed bottom-20 left-4 right-4 z-40 bg-white border border-rose/30 p-4 rounded-2xl shadow-lg animate-in fade-in slide-in-from-bottom-4">
      <div className="flex justify-between items-start mb-2">
         <span className="text-[10px] font-bold text-rose bg-rose-50 px-2 py-0.5 rounded-full">{step}</span>
         {onSkip && <button onClick={onSkip} className="text-xs text-ink-hint underline">스킵</button>}
      </div>
      <h3 className="text-sm font-bold text-ink mb-1">{title}</h3>
      <p className="text-xs text-ink-muted leading-relaxed">{body}</p>
    </div>
  );
};
