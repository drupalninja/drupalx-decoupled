import React from 'react';
import Link from 'next/link';
import './Button.scss';

export interface ButtonProps {
  url?: string;
  text: string;
  icon?: string;
  modifier?: string;
}

const Button: React.FC<ButtonProps> = ({ url, text, icon, modifier }) => {
  return (
    <>{url ? (
      <Link href={url} className={`btn ${modifier || ''} px-4 py-2`} role="button">
        {text} {icon && <span className="material-symbols-outlined ms-1">{icon}</span>}
      </Link>
    ) : (
      <button className={`btn ${modifier || ''} px-4 py-2`}>{text}</button>
    )}</>
  );
};

export default Button;
