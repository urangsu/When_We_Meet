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
        ${withBottomNav 
          ? 'bottom-[80px] pb-5 bg-gradient-to-t from-bg-app via-bg-app/90 to-transparent pt-8' 
          : 'bottom-0 pb-[calc(env(safe-area-inset-bottom)+20px)] bg-gradient-to-t from-white via-white/90 to-transparent pt-8'
        }
        z-[100] pointer-events-none
        ${className}
      `}
    >
      <div className="pointer-events-auto w-full">
        {children}
      </div>
    </div>
  );
};

