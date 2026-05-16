import React from 'react';
import { motion } from 'motion/react';
import { WaxSeal } from './WaxSeal';

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
  className = '',
}: SignatureEnvelopeProps) => {
  const isInvite = variant === 'invite';

  return (
    <div className={`relative h-[260px] w-[330px] ${className}`}>
      {/* shadow */}
      <div className="absolute left-8 right-8 bottom-3 h-12 rounded-full bg-rose/10 blur-2xl" />

      {/* opened back flap: opened 상태에서만 카드 뒤에 보임 */}
      <motion.div
        initial={false}
        animate={{
          opacity: opened ? 0.72 : 0,
          y: opened ? -6 : 8,
          scaleY: opened ? 1 : 0.96,
        }}
        transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
        style={{
          clipPath: 'polygon(0 100%, 50% 0, 100% 100%)',
        }}
        className="
          absolute left-0 right-0 bottom-[154px] z-[15] h-[76px]
          bg-white border border-rose/15
          shadow-[0_12px_28px_rgba(80,55,45,0.06)]
        "
      />

      {/* back panel */}
      <div
        className="
          absolute left-0 right-0 bottom-0 z-20 h-[170px]
          rounded-[24px] border border-rose/20 bg-white
          shadow-[0_24px_70px_rgba(180,85,95,0.16)]
        "
      />

      {/* inner card: 닫힌 상태에서는 완전히 안 보임 */}
      <motion.div
        initial={false}
        animate={{
          y: opened ? -46 : 18,
          opacity: opened ? 1 : 0,
          scale: opened ? 1 : 0.98,
        }}
        transition={{
          delay: opened ? 0.16 : 0,
          duration: 0.42,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          absolute left-[42px] right-[42px] bottom-[74px] z-30
          rounded-[18px] border border-rose/15 bg-[#FFFDF9]
          p-4 shadow-[0_14px_30px_rgba(80,55,45,0.10)]
        "
      >
        {isInvite ? (
          <>
            <p className="text-[10px] font-bold tracking-[0.12em] text-rose">
              INVITATION
            </p>
            <h2 className="mt-1 line-clamp-2 text-base font-bold leading-snug text-ink">
              {title || '새로운 초대장'}
            </h2>
            {message && (
              <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-ink-muted">
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
        ) : (
          <>
            <p className="text-[10px] font-bold tracking-[0.12em] text-rose">
              WELCOME
            </p>
            <p className="mt-1 text-sm font-bold leading-snug text-ink">
              우리의 첫 약속을<br />초대장으로
            </p>
          </>
        )}
      </motion.div>

      {/* closed front flap: 닫힌 상태에서만 앞에 보임 */}
      <motion.div
        initial={false}
        animate={{
          opacity: opened ? 0 : 1,
          scale: opened ? 0.99 : 1,
        }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        style={{
          clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
        }}
        className="
          absolute left-0 right-0 bottom-[84px] z-40 h-[116px]
          bg-white border border-rose/20
          shadow-[0_10px_24px_rgba(80,55,45,0.08)]
        "
      />

      {/* front pocket: 항상 카드 앞에 있어야 함 */}
      <div
        className="
          absolute left-0 right-0 bottom-0 z-50 h-[118px]
          rounded-b-[24px] bg-white border-x border-b border-rose/20
          shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]
        "
        style={{
          clipPath: 'polygon(0 100%, 0 18%, 50% 72%, 100% 18%, 100% 100%)',
        }}
      />

      {/* minimal fold lines */}
      <svg
        className="absolute left-0 right-0 bottom-0 z-[60] h-[170px] w-full pointer-events-none"
        viewBox="0 0 330 170"
        aria-hidden="true"
      >
        <path
          d="M0 34 L165 92 L330 34"
          fill="none"
          stroke="rgba(180,85,95,0.12)"
          strokeWidth="1"
        />
        <path
          d="M0 170 L165 92 L330 170"
          fill="none"
          stroke="rgba(180,85,95,0.16)"
          strokeWidth="1"
        />
      </svg>

      <WaxSeal
        opened={opened}
        className="absolute left-1/2 bottom-[92px] z-[80] -translate-x-1/2"
      />
    </div>
  );
};
