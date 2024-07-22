import React from 'react';
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
          <a href={link.url} className="nav-link">
            {link.text}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default UtilityNav;
