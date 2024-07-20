import React from 'react';
import './Quote.scss';

interface QuoteProps {
  modifierClass?: string;
  logo?: React.ReactNode;
  quote?: string;
  image?: React.ReactNode;
  name?: string;
  job?: string;
  layout?: 'left' | 'right';
}

const Quote: React.FC<QuoteProps> = ({
  modifierClass = '',
  logo,
  quote,
  image,
  name,
  job,
  layout = 'left',
}) => {
  return (
    <div className={`text-center d-flex justify-content-center ${modifierClass}`}>
      <div className="col-lg-10 col-xxxl-6">
        <div className="row">
          {logo && (
            <div className="quote-logo col-lg-3 mx-auto mb-2">
              {logo}
            </div>
          )}
          <blockquote className="blockquote fs-4 mb-3">
            <p className="p-3 fw-semibold d-flex align-items-center">
              {quote}
              <span className="material-symbols-outlined mb-3">format_quote</span>
            </p>
          </blockquote>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          {image && (
            <div className="quote-image me-3">
              {image}
            </div>
          )}
          <div className="quote-text">
            {name && <div className="fw-semibold">{name}</div>}
            {job && <p className="fs-6">{job}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quote;
