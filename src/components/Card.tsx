import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'ivory' | 'glass';
}

export const Card: React.FC<CardProps> = ({ children, className = '', variant = 'default' }) => {
  const styles = {
    default: "bg-surface rounded-2xl p-6 shadow-soft border border-line",
    ivory: "bg-surface-warm rounded-2xl p-6 border border-line",
    glass: "bg-surface/78 backdrop-blur-xl rounded-2xl p-6 shadow-warm border border-white/50"
  };

  return (
    <div className={`${styles[variant]} ${className}`}>
      {children}
    </div>
  );
};

interface ChipProps {
  children: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export const Chip: React.FC<ChipProps> = ({ children, selected, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 rounded-full text-sm font-semibold transition-all
        flex items-center gap-2
        ${selected 
          ? 'bg-surface border-primary border-[1.5px] text-primary-deep' 
          : 'bg-surface border-line border-[1px] text-ink-muted'}
        ${className}
      `}
    >
      {selected && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
      {children}
    </button>
  );
};
