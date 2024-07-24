import React from 'react';
import { Attributes } from 'react';
import './Menu.scss';

interface MenuItemProps {
  url: string;
  title: string;
}

interface MenuProps {
  menuItems: MenuItemProps[];
  attributes?: Attributes;
  modifier?: string;
  itemModifier?: string;
}

const Menu: React.FC<MenuProps> = ({
  menuItems,
  attributes,
  modifier = '',
  itemModifier = '',
}) => {
  return (
    <div className={modifier}>
      <ul className="nav flex-column flex-lg-row">
        {menuItems.map((item, index) => (
          <li key={index} className="nav-item">
            <a href={item.url} className={`nav-link text-decoration-none ${itemModifier}`}>
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
