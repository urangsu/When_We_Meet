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
        ${withBottomNav ? 'bottom-[96px]' : 'bottom-5'}
        z-[100]
        ${className}
      `}
    >
      {children}
    </div>
  );
};
