import React from 'react';
import NextLink from 'next/link';
import './Link.scss';

interface LinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

const Link: React.FC<LinkProps> = ({ href, className, children }) => {
  return (
    <NextLink href={href} className={`link ${className || ''}`}>
      {children}
    </NextLink>
  );
};

export default Link;
