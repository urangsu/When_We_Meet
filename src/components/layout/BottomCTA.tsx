import React from 'react';

interface BottomCTAProps {
  children: React.ReactNode;
  className?: string;
}

export const BottomCTA: React.FC<BottomCTAProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`fixed inset-x-0 bottom-0 z-50 flex justify-center pointer-events-none ${className}`}>
      <div className="w-full max-w-[430px] px-5 pb-[calc(env(safe-area-inset-bottom)+20px)] pt-6 bg-gradient-to-t from-bg-app via-bg-app/95 to-transparent pointer-events-none">
        <div className="pointer-events-auto w-full">
          {children}
        </div>
      </div>
    </div>
  );
};

