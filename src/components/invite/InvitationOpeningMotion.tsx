import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Button } from '../Button';

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

const envelopeThemeStyles = {
  warm: {
    background: 'bg-[#F7F3EC]',
    envelope: 'bg-white',
    lineColor: 'rgba(180, 85, 95, 0.35)',
    lineStrongColor: 'rgba(180, 85, 95, 0.72)',
    seal: 'bg-rose',
    shadow: 'shadow-[0_20px_60px_rgba(180,85,95,0.18)]',
    card: 'bg-[#FFFDF9]',
    accent: 'text-rose',
    divider: 'bg-rose-200',
  },
  night: {
    background: 'bg-[#111111]',
    envelope: 'bg-[#F7F3EC]',
    lineColor: 'rgba(255, 255, 255, 0.35)',
    lineStrongColor: 'rgba(255, 255, 255, 0.72)',
    seal: 'bg-[#111111]',
    shadow: 'shadow-[0_20px_60px_rgba(0,0,0,0.35)]',
    card: 'bg-[#1F1F1F]',
    accent: 'text-white',
    divider: 'bg-gray-700',
  },
  picnic: {
    background: 'bg-[#F6F1E7]',
    envelope: 'bg-white',
    lineColor: 'rgba(162, 53, 43, 0.35)',
    lineStrongColor: 'rgba(162, 53, 43, 0.72)',
    seal: 'bg-[#A2352B]',
    shadow: 'shadow-[0_20px_60px_rgba(162,53,43,0.16)]',
    card: 'bg-[#FFFDF7]',
    accent: 'text-[#A2352B]',
    divider: 'bg-[#A2352B]/20',
  },
} as const;

const ClassicOpeningMotion: React.FC<InvitationOpeningMotionProps> = ({ title, hostName, themeId, onComplete }) => {
  const isDark = themeId === 'night';
  return (
    <div className={`fixed inset-0 z-50 ${isDark ? 'bg-ink' : 'bg-surface'} flex items-center justify-center p-5 overflow-hidden`}>
      <motion.div
        initial={{ y: 50, opacity: 0, rotateX: 15 }}
        animate={{ y: 0, opacity: 1, rotateX: 0 }}
        transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
        className={`w-full max-w-sm ${isDark ? 'bg-ink-muted' : 'bg-white'} rounded-[24px] shadow-xl p-8`}
      >
        <div className="flex flex-col items-center text-center space-y-4">
             <h1 className={`font-bold text-2xl ${isDark ? 'text-white' : 'text-ink'} leading-tight`}>{title}</h1>
             <Button onClick={() => onComplete?.()} className="mt-4">열어보기</Button>
        </div>
      </motion.div>
    </div>
  );
};

export const InvitationOpeningMotion: React.FC<InvitationOpeningMotionProps> = ({
  title,
  hostName,
  themeId,
  preview,
  variant = 'envelope',
  onComplete
}) => {
  const style = envelopeThemeStyles[(themeId as keyof typeof envelopeThemeStyles)] || envelopeThemeStyles.warm;
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (!preview) {
      const timer = setTimeout(() => {
        onComplete?.();
      }, prefersReducedMotion ? 1000 : 4200);
      return () => clearTimeout(timer);
    }
  }, [preview, onComplete, prefersReducedMotion]);

  if (variant === 'classic') {
    return <ClassicOpeningMotion title={title} hostName={hostName} themeId={themeId} onComplete={onComplete} />;
  }

  return (
    <div className={`fixed inset-0 z-50 ${style.background} flex items-center justify-center p-6 overflow-hidden`}>
      <div className="relative w-[320px] h-[230px]">
        {/* 안쪽 초대장 카드 */}
        <motion.div
           initial={{ y: 80, opacity: 0, scale: 0.96 }}
           animate={{ y: -52, opacity: 1, scale: 1 }}
           transition={{ delay: prefersReducedMotion ? 0 : 1.05, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
           className={`absolute left-6 right-6 bottom-10 z-10 ${style.card} rounded-3xl border border-line p-5 shadow-lg`}
        >
          <p className={`text-[10px] font-bold ${style.accent} uppercase tracking-wider`}>초대장이 도착했어요</p>
          <h1 className="mt-2 text-xl font-bold text-ink leading-tight">{title}</h1>
          {hostName && <p className="text-xs text-ink-muted mt-1">{hostName}님의 초대</p>}
        </motion.div>

        {/* 봉투 뒷면 */}
        <div className={`absolute inset-x-0 bottom-0 h-[180px] rounded-b-3xl ${style.envelope} border border-rose/30 shadow`} />

        {/* 봉투 앞면 좌우 삼각선 */}
        <svg viewBox="0 0 320 180" className="absolute inset-0 h-full w-full z-30 pointer-events-none">
          <path d="M8 8 L160 100 L312 8" fill="none" stroke={style.lineStrongColor} strokeWidth="2" />
          <path d="M8 172 L125 82" fill="none" stroke={style.lineColor} strokeWidth="2" />
          <path d="M312 172 L195 82" fill="none" stroke={style.lineColor} strokeWidth="2" />
        </svg>

        {/* flap */}
        <motion.div
          initial={{ rotateX: 0 }}
          animate={{ rotateX: prefersReducedMotion ? 0 : -155 }}
          transition={{ delay: prefersReducedMotion ? 0 : 0.7, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: 'top center', transformPerspective: 900 }}
          className={`absolute top-[10px] left-0 right-0 z-40 h-[100px] ${style.envelope} rounded-t-3xl border border-rose/30`}
        />

        {/* seal */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: prefersReducedMotion ? 0 : 0 }}
          transition={{ delay: 0.7 }}
          className={`absolute left-1/2 -ml-3 top-[85px] z-50 w-6 h-6 rounded-full ${style.seal}`}
        />
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: prefersReducedMotion ? 0 : 2.6, duration: 0.5 }}
        className="absolute bottom-10 left-0 right-0 px-6 flex justify-center w-full"
      >
        <Button 
          onClick={() => onComplete?.()} 
          size="full"
          className="max-w-sm shadow-lg shadow-rose-200"
        >
          초대장 열어보기
        </Button>
      </motion.div>
    </div>
  );
};
