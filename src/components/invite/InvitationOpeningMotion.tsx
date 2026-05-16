import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '../Button';
import { SignatureEnvelope } from './SignatureEnvelope';

type InvitationMotionVariant = 'envelope' | 'classic';

interface InvitationOpeningMotionProps {
  title: string;
  hostName?: string;
  message?: string;
  dateLabel?: string;
  placeLabel?: string;
  activityLabel?: string;
  themeId?: string;
  preview?: boolean;
  variant?: InvitationMotionVariant;
  onComplete?: () => void;
}
// ...ClassicOpeningMotion remains the same
const ClassicOpeningMotion: React.FC<InvitationOpeningMotionProps> = ({ 
  title, hostName, message, dateLabel, placeLabel, activityLabel, themeId, onComplete 
}) => {
  const isDark = themeId === 'night';
  const cardTextClass = isDark ? 'text-white' : 'text-ink';
  const cardMutedTextClass = isDark ? 'text-white/70' : 'text-ink-muted';
  const cardPanelClass = isDark ? 'bg-white/5 border-white/10' : 'bg-white/70 border-line';
  
  return (
    <div className={`fixed inset-0 z-50 ${isDark ? 'bg-ink' : 'bg-surface'} flex items-center justify-center p-5 overflow-hidden`}>
      <motion.div
        initial={{ y: 50, opacity: 0, rotateX: 15 }}
        animate={{ y: 0, opacity: 1, rotateX: 0 }}
        transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
        className={`w-full max-w-sm ${isDark ? 'bg-ink-muted' : 'bg-white'} rounded-[24px] shadow-xl p-8`}
      >
        <div className="flex flex-col items-center text-center space-y-4">
             <h1 className={`font-bold text-2xl ${cardTextClass} leading-tight`}>{title}</h1>
             {hostName && <p className={`text-sm ${cardMutedTextClass}`}>{hostName}님의 초대</p>}
             {message && <p className={`text-sm ${cardMutedTextClass} italic`}>“{message}”</p>}
             {(dateLabel || placeLabel || activityLabel) && (
                <div className={`mt-2 w-full grid gap-1.5 rounded-2xl ${cardPanelClass} p-3 text-left`}>
                    {dateLabel && <p className={`text-xs ${cardTextClass}`}>📅 {dateLabel}</p>}
                    {placeLabel && <p className={`text-xs ${cardTextClass}`}>📍 {placeLabel}</p>}
                    {activityLabel && <p className={`text-xs ${cardTextClass}`}>🎯 {activityLabel}</p>}
                </div>
             )}
             <Button onClick={() => onComplete?.()} className="mt-4">열어보기</Button>
        </div>
      </motion.div>
    </div>
  );
};
// ...

export const InvitationOpeningMotion: React.FC<InvitationOpeningMotionProps> = ({
  title,
  hostName,
  message,
  dateLabel,
  placeLabel,
  activityLabel,
  themeId,
  preview,
  variant = 'envelope',
  onComplete
}) => {
  const [opened, setOpened] = useState(false);
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const openTimer = setTimeout(() => setOpened(true), prefersReducedMotion ? 80 : 650);
    
    if (!preview) {
      const timer = setTimeout(() => {
        onComplete?.();
      }, prefersReducedMotion ? 1000 : 4200);
      return () => {
        clearTimeout(openTimer);
        clearTimeout(timer);
      };
    } else {
        return () => clearTimeout(openTimer);
    }
  }, [preview, onComplete, prefersReducedMotion]);

  if (variant === 'classic') {
    return <ClassicOpeningMotion title={title} hostName={hostName} message={message} dateLabel={dateLabel} placeLabel={placeLabel} activityLabel={activityLabel} themeId={themeId} onComplete={onComplete} />;
  }

  return (
    <div className={`fixed inset-0 z-50 bg-[#F7F3EC] flex items-center justify-center p-6 overflow-hidden`}>
        <SignatureEnvelope
            opened={opened}
            variant="invite"
            title={title}
            message={message}
            dateLabel={dateLabel}
            placeLabel={placeLabel}
            activityLabel={activityLabel}
            themeId={themeId}
        />

      {/* CTA - constrained container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: prefersReducedMotion ? 0 : 2.6, duration: 0.5 }}
        className="absolute bottom-10 left-4 right-4 z-40 flex justify-center"
      >
        <div className="w-full max-w-[360px]">
          <Button 
            onClick={() => onComplete?.()} 
            size="full"
            className="shadow-lg shadow-rose-200"
          >
            초대장 열어보기
          </Button>
        </div>
      </motion.div>
    </div>
  );
};
