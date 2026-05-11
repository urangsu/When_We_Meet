import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'ivory' | 'glass';
}

export const Card: React.FC<CardProps> = ({ children, className = '', variant = 'default' }) => {
  const styles = {
    default: "bg-white rounded-2xl p-6 shadow-warm border border-ink-line",
    ivory: "bg-ivory rounded-2xl p-6 border border-ink-line",
    glass: "bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-warm"
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
          ? 'bg-white border-rose border-[1.5px] text-rose-deep' 
          : 'bg-white border-ink-line border-[1px] text-ink-muted'}
        ${className}
      `}
    >
      {selected && <div className="w-1.5 h-1.5 rounded-full bg-rose" />}
      {children}
    </button>
  );
};
