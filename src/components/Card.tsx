import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'ivory' | 'glass';
  key?: string | number;
}

export const Card = ({ children, className = '', variant = 'default' }: CardProps) => {
  const styles = {
    default: "bg-white rounded-[28px] p-6 shadow-warm border border-ink-line/5",
    ivory: "bg-ivory rounded-[28px] p-6 border border-ink-line",
    glass: "bg-white/70 backdrop-blur-xl rounded-[28px] p-6 shadow-warm"
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
  key?: string | number;
}

export const Chip = ({ children, selected, onClick, className = '' }: ChipProps) => {
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 rounded-full text-sm font-medium transition-all border-1.5
        flex items-center gap-2
        ${selected 
          ? 'bg-rose-halo border-rose text-rose-deep font-semibold' 
          : 'bg-white border-ink-line text-ink-muted'}
        ${className}
      `}
    >
      {selected && <div className="w-1.5 h-1.5 rounded-full bg-rose shadow-[0_0_0_1.5px_white]" />}
      {children}
    </button>
  );
};
