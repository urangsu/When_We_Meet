import React from 'react';
import { motion } from 'motion/react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'decline';
  size?: 'sm' | 'md' | 'lg' | 'full';
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

export const Button = ({ variant = 'primary', size = 'md', children, className = '', ...props }: ButtonProps) => {
  const baseStyles = "rounded-2xl font-semibold transition-all flex items-center justify-center gap-2 active:scale-[0.98]";
  
  const variants = {
    primary: "bg-rose text-white active:bg-rose-deep",
    secondary: "bg-white text-ink border border-ink-line",
    ghost: "bg-transparent text-ink-muted active:bg-ink-line",
    outline: "bg-white border border-ink-line text-ink",
    decline: "bg-white border border-ink-line text-danger active:bg-danger-bg"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3.5 text-base",
    lg: "px-8 py-4 text-lg",
    full: "w-full py-4 text-lg"
  };

  return (
    <motion.button
      whileTap={props.disabled ? undefined : { scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className} ${props.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      {...props}
      onClick={(e) => {
        console.log('[Button click]', children);
        props.onClick?.(e);
      }}
    >
      {children}
    </motion.button>
  );
};
