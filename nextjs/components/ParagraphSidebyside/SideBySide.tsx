import React from 'react';
import classNames from 'classnames';
import Button from '../Button/Button';
import Badge from '../Badge/Badge';
import './SideBySide.scss';

interface SideBySideProps {
  eyebrow?: string;
  title: string;
  media: React.ReactNode;
  body?: React.ReactNode;
  button?: {
    url: string;
    text: string;
    icon: string;
    modifier: string;
  };
  layout?: 'left' | 'right';
  modifier?: string;
}

const SideBySide: React.FC<SideBySideProps> = ({
  eyebrow,
  title,
  media,
  body,
  button,
  layout = 'left',
  modifier = '',
}) => {
  return (
    <div className={classNames('side-by-side', 'container', layout, modifier)}>
      <div className={classNames('row', 'flex-column', 'gy-3', { 'flex-lg-row-reverse': layout === 'right', 'flex-lg-row': layout === 'left' }, 'justify-content-between', 'align-items-center')}>
        <div className="col-lg-6">
          <div className="shadow rounded">{media}</div>
        </div>
        <div className="col-lg-6 col-xxl-5 d-flex flex-column gap-3">
          {eyebrow && <Badge tag={eyebrow} modifier="text-bg-secondary text-uppercase" />}
          <h2 className="mb-2">{title}</h2>
          {body && <div>{body}</div>}
          {button && (
            <Button
              url={button.url}
              text={button.text}
              icon={button.icon}
              modifier={button.modifier}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBySide;
