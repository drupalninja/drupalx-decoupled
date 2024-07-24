import React from 'react';
import './Tabs.scss';

interface TabItem {
  title: string;
  url: string;
  active?: boolean;
  disabled?: boolean;
}

interface TabsProps {
  tabItems: TabItem[];
}

const Tabs: React.FC<TabsProps> = ({ tabItems }) => {
  return (
    <ul className="nav nav-tabs">
      {tabItems.map((item, index) => (
        <li className="nav-item" key={index}>
          {item.active ? (
            <a className="nav-link active" aria-current="page" href={item.url}>
              {item.title}
            </a>
          ) : item.disabled ? (
            <a className="nav-link disabled" href={item.url} aria-disabled="true">
              {item.title}
            </a>
          ) : (
            <a className="nav-link" href={item.url}>
              {item.title}
            </a>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Tabs;
