import React, { FC } from 'react';
import Image from 'next/image';
import './Logo.scss';

interface LogoProps {
  modifier?: string;
  siteLogo?: string;
}

const Logo: FC<LogoProps> = ({ modifier = '', siteLogo = './images/logo.svg' }) => {
  return (
    <div className={modifier}>
      <Image src={siteLogo} width={312} height={96} className="logo w-100" alt="Site logo" />
    </div>
  );
};

export default Logo;
