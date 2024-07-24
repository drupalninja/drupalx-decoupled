import React from 'react';
import './Shadow.scss';

interface ShadowProps {
  variant?: 'sm' | 'regular' | 'lg';
}

const Shadow: React.FC<ShadowProps> = ({ variant = 'regular' }) => {
  const shadowClasses = {
    sm: 'shadow-sm',
    regular: 'shadow',
    lg: 'shadow-lg',
  };

  return (
    <div className={`p-3 mb-5 bg-body rounded ${shadowClasses[variant]}`}>
      {variant.charAt(0).toUpperCase() + variant.slice(1)} shadow
    </div>
  );
};

export default Shadow;
