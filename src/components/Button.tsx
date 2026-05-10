import React from 'react';
import { motion } from 'motion/react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'full';
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

export const Button = ({ variant = 'primary', size = 'md', children, className = '', ...props }: ButtonProps) => {
  const baseStyles = "rounded-2xl font-semibold transition-all flex items-center justify-center gap-2 active:scale-[0.98]";
  
  const variants = {
    primary: "bg-rose text-white shadow-warm active:bg-rose-deep selection:bg-white/30",
    secondary: "bg-ink-line text-ink active:bg-ink-line/20",
    ghost: "bg-transparent text-ink-muted active:bg-ink-line",
    outline: "bg-white border border-ink-line text-ink active:bg-ivory"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3.5 text-base",
    lg: "px-8 py-4 text-lg",
    full: "w-full py-4.5 text-lg"
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};
