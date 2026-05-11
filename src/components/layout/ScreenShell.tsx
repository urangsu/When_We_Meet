import React from 'react';

interface ScreenShellProps {
  children: React.ReactNode;
  className?: string;
  withBottomNav?: boolean;
  hasBottomCTA?: boolean;
}

const BOTTOM_NAV_HEIGHT = 88;
const BOTTOM_CTA_HEIGHT = 88; // Ensure we reserve enough height if CTA is fixed, although BottomCTA will take space in document or overlay. If fixed, we need padding.

export const ScreenShell: React.FC<ScreenShellProps> = ({
  children,
  className = '',
  withBottomNav = false,
  hasBottomCTA = false,
}) => {
  // calculate pb depending on layout
  let pbClass = 'pb-safe-bottom';
  
  if (withBottomNav && hasBottomCTA) {
    pbClass = 'pb-[180px]'; // approximated height for CTA + Nav
  } else if (withBottomNav) {
    pbClass = 'pb-[88px]'; // BOTTOM_NAV_HEIGHT
  } else if (hasBottomCTA) {
    pbClass = 'pb-[100px]'; // safe area + cta height
  }

  return (
    <div
      className={`
        flex flex-col min-h-[100dvh] px-5 pt-5
        ${pbClass}
        ${className}
      `}
    >
      {children}
    </div>
  );
};
