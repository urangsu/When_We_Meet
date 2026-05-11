import React from 'react';
import type { ProfileColorId } from '../../types';
import { profileColorOptions } from '../../config/profileColorOptions';

interface InitialAvatarProps {
  name: string;
  colorId?: ProfileColorId;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const InitialAvatar = ({ name, colorId, size = 'sm', className = '' }: InitialAvatarProps) => {
  const color = profileColorOptions.find((c) => c.id === colorId) || profileColorOptions[6]; // default gray

  const sizeClasses = {
    sm: 'w-8 h-8 text-[10px]',
    md: 'w-10 h-10 text-sm',
    lg: 'w-16 h-16 text-xl',
  };

  return (
    <div
      className={`rounded-full flex items-center justify-center font-bold border transition-all ${sizeClasses[size]} ${className}`}
      style={{
        backgroundColor: color.bg,
        color: color.text,
        borderColor: color.border ?? 'transparent',
      }}
    >
      {name.charAt(0)}
    </div>
  );
};
