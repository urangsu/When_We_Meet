import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../Button';
import { MailOpen } from 'lucide-react';

interface InvitationOpeningMotionProps {
  title: string;
  hostName?: string;
  message?: string;
  dateLabel?: string;
  placeLabel?: string;
  activityLabel?: string;
  themeId?: string;
  preview?: boolean;
  onComplete?: () => void;
}

export const InvitationOpeningMotion: React.FC<InvitationOpeningMotionProps> = ({
  title,
  hostName,
  message,
  dateLabel,
  placeLabel,
  activityLabel,
  themeId,
  preview,
  onComplete
}) => {
  useEffect(() => {
    if (!preview) {
      // Auto complete after 4 seconds to ensure guest can interact
      const timer = setTimeout(() => {
        onComplete?.();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [preview, onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-[#F4F1EA] flex flex-col items-center justify-center p-5 overflow-hidden">
      {/* Background decoration */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="absolute w-full h-[60%] top-0 left-0 bg-gradient-to-b from-rose-50 to-transparent -z-10"
      />

      {/* Main Card */}
      <motion.div
        initial={{ y: 50, opacity: 0, rotateX: 15 }}
        animate={{ y: 0, opacity: 1, rotateX: 0 }}
        transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
        className="w-full max-w-sm bg-white rounded-[24px] shadow-xl p-8 relative overflow-hidden"
      >
        {/* Envelope flap effect */}
        <motion.div 
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="absolute inset-0 bg-rose z-20 flex flex-col items-center justify-center rounded-[24px]"
        >
          <MailOpen size={48} className="text-white mb-4" />
          <p className="text-white font-bold text-lg">초대장이 도착했어요</p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="relative z-10 flex flex-col items-center text-center space-y-6"
        >
          <div>
            <h1 className="font-bold text-2xl text-ink leading-tight mb-2">{title}</h1>
            {hostName && <p className="text-ink-muted text-sm">{hostName}님의 초대</p>}
          </div>

          <div className="w-12 h-px bg-rose-200" />

          {message && (
            <p className="text-ink text-base whitespace-pre-wrap leading-relaxed px-4">
              "{message}"
            </p>
          )}

          <div className="w-full bg-[#FAFAFA] rounded-xl p-4 flex flex-col gap-2 mt-4 border border-ink-line">
            {dateLabel && (
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-ink-hint uppercase">언제</span>
                <span className="text-sm font-medium text-ink">{dateLabel}</span>
              </div>
            )}
            {placeLabel && (
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-ink-hint uppercase">어디서</span>
                <span className="text-sm font-medium text-ink">{placeLabel}</span>
              </div>
            )}
            {activityLabel && (
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-ink-hint uppercase">뭐 할까</span>
                <span className="text-sm font-medium text-ink">{activityLabel}</span>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 2.5 }}
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
