import React from 'react';
import { motion } from 'motion/react';

interface WaxSealProps {
  opened?: boolean;
  className?: string;
}

export const WaxSeal = ({ opened = false, className = '' }: WaxSealProps) => {
  return (
    <motion.div
      initial={false}
      animate={{
        opacity: opened ? 0 : 1,
        scale: opened ? 0.68 : 1,
        y: opened ? -8 : 0,
      }}
      transition={{ duration: 0.26 }}
      className={`relative h-9 w-9 ${className}`}
    >
      <svg viewBox="0 0 44 44" className="h-full w-full drop-shadow-[0_7px_14px_rgba(180,85,95,0.24)]">
        <path
          d="M22 2.8C26.6 2.8 28.5 5 31.8 6.5C35.1 8 38.7 8.9 40.2 12.2C41.7 15.5 40.2 18.5 40.8 22C41.4 25.5 43 29.1 40.8 32.1C38.6 35.1 35 35.3 31.9 37.2C28.8 39.1 26 42 22 41.4C18 40.8 15.4 38.5 12.2 37.1C9 35.7 5.4 35 3.9 31.8C2.4 28.6 4 25.3 3.5 22C3 18.7 1.3 15.3 3.4 12.3C5.5 9.3 9.3 8.9 12.4 6.9C15.5 4.9 17.4 2.8 22 2.8Z"
          fill="#D9647A"
        />
        <circle cx="22" cy="22" r="14.5" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
        <path
          d="M15 17.5H29M17 14L22 29L27 14"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
};
