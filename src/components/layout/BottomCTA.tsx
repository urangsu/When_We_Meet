import React from 'react';

interface BottomCTAProps {
  children: React.ReactNode;
  withBottomNav?: boolean;
  className?: string;
}

export const BottomCTA: React.FC<BottomCTAProps> = ({
  children,
  withBottomNav = false,
  className = '',
}) => {
  return (
    <div 
      className={`
        fixed left-1/2 -translate-x-1/2 w-full max-w-md px-5
        ${withBottomNav ? 'bottom-[88px] pb-5' : 'bottom-0 pb-safe-bottom mb-5'}
        z-40 pointer-events-none
        ${className}
      `}
    >
      <div className="pointer-events-auto shadow-[0_-20px_20px_-15px_rgba(255,255,255,0.8)]">
        {children}
      </div>
    </div>
  );
};
