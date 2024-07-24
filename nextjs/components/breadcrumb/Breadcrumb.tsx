import React from 'react';
import './Breadcrumb.scss';

interface BreadcrumbItem {
  text: string;
  url: string;
}

interface BreadcrumbProps {
  breadcrumb: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ breadcrumb }) => {
  return (
    <nav aria-label="breadcrumb">
      <h2 id="system-breadcrumb" className="visually-hidden">Breadcrumb</h2>
      <ol className="breadcrumb">
        {breadcrumb.map((item, index) => (
          <li key={index} className={`breadcrumb-item${item.url ? '' : ' active'}`} aria-current={!item.url ? 'page' : undefined}>
            {item.url ? <a href={item.url}>{item.text}</a> : item.text}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
