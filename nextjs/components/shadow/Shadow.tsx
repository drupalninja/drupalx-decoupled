import React from 'react';
import { cn } from "@/lib/utils";

interface ShadowProps {
  variant?: 'sm' | 'regular' | 'lg';
  className?: string;
}

const Shadow: React.FC<ShadowProps> = ({ variant = 'regular', className }) => {
  const shadowClasses = {
    sm: 'shadow-sm',
    regular: 'shadow',
    lg: 'shadow-lg',
  };

  return (
    <div className={cn(
      "p-3 mb-5 bg-background rounded",
      shadowClasses[variant],
      className
    )}>
      {variant.charAt(0).toUpperCase() + variant.slice(1)} shadow
    </div>
  );
};

export default Shadow;
