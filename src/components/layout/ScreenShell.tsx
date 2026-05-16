import React from 'react';

interface ScreenShellProps {
  children: React.ReactNode;
  className?: string;
  bottomInset?: 'none' | 'nav' | 'cta' | 'ctaWithHint';
  withBottomNav?: boolean;
  hasBottomCTA?: boolean;
}

export const ScreenShell: React.FC<ScreenShellProps> = ({
  children,
  className = '',
  bottomInset,
  withBottomNav = false,
  hasBottomCTA = false,
}) => {
  const resolvedBottomInset =
    bottomInset ??
    (withBottomNav && hasBottomCTA
      ? 'ctaWithHint'
      : withBottomNav
        ? 'nav'
        : hasBottomCTA
          ? 'cta'
          : 'none');

  const pbClass = {
    none: 'pb-8',
    nav: 'pb-[96px]',
    cta: 'pb-[120px]',
    ctaWithHint: 'pb-[170px]',
  }[resolvedBottomInset];

  return (
    <div className={`flex min-h-[100dvh] flex-col px-5 pt-5 ${pbClass} ${className}`}>
      {children}
    </div>
  );
};
