import React from 'react';
import Link from 'next/link';
import './UtilityNav.scss';

interface UtilityNavLink {
  url: string;
  text: string;
}

interface UtilityNavProps {
  links: UtilityNavLink[];
}

const UtilityNav: React.FC<UtilityNavProps> = ({ links }) => {
  return (
    <ul className="nav">
      {links.map((link, index) => (
        <li key={index} className="nav-item">
          <Link href={link.url} className="nav-link">
            {link.text}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default UtilityNav;
