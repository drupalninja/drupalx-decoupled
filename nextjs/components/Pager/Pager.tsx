import React from 'react';
import './Pager.scss';

interface PagerProps {
  headingId: string;
  pagerItems: {
    previous?: {
      href: string;
      text: string;
    };
    pages: {
      href: string;
    }[];
    next?: {
      href: string;
      text: string;
    };
  };
}

const Pager: React.FC<PagerProps> = ({ headingId, pagerItems }) => {
  return (
    <nav className="pager" role="navigation" aria-labelledby={headingId}>
      <h4 id={headingId} className="visually-hidden">Pagination</h4>
      <ul className="pagination">
        {pagerItems.previous && (
          <li className="page-item">
            <a className="page-link" href={pagerItems.previous.href} title="Go to previous page" rel="prev">
              {pagerItems.previous.text}
            </a>
          </li>
        )}
        {pagerItems.pages.map((page, index) => (
          <li key={index} className={`page-item${index === 0 ? ' active' : ''}`}>
            <a href={page.href} title={`Go to page (${index + 1})`} className="page-link">
              <span className="visually-hidden">{index === 0 ? 'Current page' : 'Page'}</span>
              {index + 1}
            </a>
          </li>
        ))}
        {pagerItems.next && (
          <li className="page-item">
            <a className="page-link" href={pagerItems.next.href} title="Go to next page" rel="next">
              {pagerItems.next.text}
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pager;
