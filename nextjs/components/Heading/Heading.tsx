import * as React from 'react';
import './Heading.scss';

export interface HeadingProps {
  title: string;
  level?: number;
  modifier?: string;
  icon?: React.ReactNode;
  url?: string;
}

const Heading: React.FC<HeadingProps> = ({ title, level = 2, modifier = '', icon, url }) => {
  const headingLevel = `h${level}` as React.ElementType;

  return (
    <React.Fragment>
      {title && (
        React.createElement(headingLevel, { className: `heading ${modifier}` },
          icon,
          url ? <a href={url} className="text-decoration-none">{title}</a> : title
        )
      )}
    </React.Fragment>
  );
};

export default Heading;
