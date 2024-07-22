import React from 'react';
import { Dropdown } from 'react-bootstrap';
import './InlineNavigation.scss';

interface InlineNavigationProps {
  navItems: { text: string; url: string }[];
}

const InlineNavigation: React.FC<InlineNavigationProps> = ({ navItems }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        Inline navigation
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {navItems.map((item, index) => (
          <Dropdown.Item key={index} href={item.url}>{item.text}</Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default InlineNavigation;
