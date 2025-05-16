import React, { useState, useEffect } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'link' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
  animate?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  animate = false,
  ...props
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  // For continuous animation
  useEffect(() => {
    if (animate) {
      const interval = setInterval(() => {
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 1500);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [animate]);

  const baseStyles =
    'relative inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2';

  const variantStyles = {
    primary: 'bg-brandblue hover:bg-sky-600 text-white rounded',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 rounded',
    link: 'text-brandblue hover:underline bg-transparent !p-0 flex items-center gap-2',
    outline:
      'border border-brandblue bg-transparent hover:bg-brandblue/10 text-brandblue rounded',
  };

  const sizeStyles = {
    sm: 'text-sm py-1 px-3',
    md: 'text-base py-2 px-4',
    lg: 'text-base py-2 px-6 font-semibold',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {(animate || isAnimating) && (
        <div className="absolute inset-0 overflow-hidden rounded pointer-events-none">
          <span
            className="absolute inset-0 rounded animate-pulse opacity-20"
            style={{ background: 'currentColor' }}
          />
        </div>
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
};
