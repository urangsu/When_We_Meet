import React from 'react';
import { motion } from 'motion/react';

interface SignatureEnvelopeProps {
  opened: boolean;
  variant?: 'welcome' | 'invite';
  title?: string;
  message?: string;
  dateLabel?: string;
  placeLabel?: string;
  activityLabel?: string;
  themeId?: string;
  className?: string;
}

export const SignatureEnvelope = ({
  opened,
  variant = 'welcome',
  title,
  message,
  dateLabel,
  placeLabel,
  activityLabel,
  themeId,
  className = '',
}: SignatureEnvelopeProps) => {

  return (
    <div className={`relative h-[238px] w-[320px] [perspective:1000px] ${className}`}>
      {/* inner card */}
      <motion.div
        initial={false}
        animate={{
          y: opened ? -54 : 28,
          opacity: opened ? 1 : 0,
          scale: opened ? 1 : 0.96,
        }}
        transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-[34px] right-[34px] bottom-[88px] z-10 rounded-[22px] border border-rose/15 bg-[#FFFDF9] p-4 shadow-[0_16px_34px_rgba(80,55,45,0.12)]"
      >
        {variant === 'welcome' ? (
            <>
                <p className="text-[10px] font-bold text-rose tracking-[0.12em]">WELCOME</p>
                <p className="mt-1 text-sm font-bold text-ink leading-snug">
                    우리의 첫 약속을<br />초대장으로
                </p>
            </>
        ) : (
            <>
                <p className="text-[10px] font-bold text-rose tracking-[0.12em]">INVITATION</p>
                <h2 className="mt-1 text-base font-bold text-ink line-clamp-2">
                    {title}
                </h2>
                {message && (
                    <p className="mt-2 text-xs text-ink-muted leading-relaxed line-clamp-2">
                        “{message}”
                    </p>
                )}
                {(dateLabel || placeLabel || activityLabel) && (
                    <div className="mt-3 flex flex-col gap-1 text-[10px] text-ink-muted">
                        {dateLabel && <span>언제 · {dateLabel}</span>}
                        {placeLabel && <span>어디서 · {placeLabel}</span>}
                        {activityLabel && <span>뭐 할까 · {activityLabel}</span>}
                    </div>
                )}
            </>
        )}
      </motion.div>

      {/* envelope back body */}
      <div className="absolute left-0 right-0 bottom-0 z-20 h-[168px] rounded-[26px] border border-rose/25 bg-white shadow-[0_24px_70px_rgba(180,85,95,0.20)]" />

      {/* top triangular flap */}
      <motion.div
        initial={false}
        animate={{
          rotateX: opened ? -168 : 0,
          y: opened ? -2 : 0,
        }}
        transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
        style={{
          transformOrigin: 'top center',
          transformStyle: 'preserve-3d',
          clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
        }}
        className="absolute left-0 right-0 bottom-[82px] z-30 h-[112px] bg-white border border-rose/25 shadow-[0_8px_22px_rgba(80,55,45,0.08)]"
      />

      {/* front left fold */}
      <div
        className="absolute left-0 bottom-0 z-40 h-[168px] w-1/2 bg-white border-l border-b border-rose/25"
        style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }}
      />

      {/* front right fold */}
      <div
        className="absolute right-0 bottom-0 z-40 h-[168px] w-1/2 bg-white border-r border-b border-rose/25"
        style={{ clipPath: 'polygon(100% 0, 0 50%, 100% 100%)' }}
      />

      {/* front bottom fold */}
      <div
        className="absolute left-0 right-0 bottom-0 z-50 h-[104px] rounded-b-[26px] bg-white border-x border-b border-rose/25"
        style={{ clipPath: 'polygon(0 100%, 50% 18%, 100% 100%)' }}
      />

      {/* fold lines */}
      <svg className="absolute left-0 right-0 bottom-0 z-[55] h-[168px] w-full pointer-events-none" viewBox="0 0 320 168">
        <path d="M0 0 L160 84 L320 0" fill="none" stroke="rgba(180,85,95,0.28)" strokeWidth="1.4" />
        <path d="M0 168 L160 84 L320 168" fill="none" stroke="rgba(180,85,95,0.34)" strokeWidth="1.4" />
      </svg>

      {/* seal */}
      <motion.div
        initial={false}
        animate={{
          opacity: opened ? 0 : 1,
          scale: opened ? 0.65 : 1,
          y: opened ? -10 : 0,
        }}
        transition={{ duration: 0.28 }}
        className="absolute left-1/2 bottom-[92px] z-[70] h-7 w-7 -translate-x-1/2 rounded-full bg-rose shadow-[0_8px_20px_rgba(180,85,95,0.30)]"
      />
    </div>
  );
};
