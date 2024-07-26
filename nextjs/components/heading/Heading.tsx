import * as React from 'react';
import Link from 'next/link';
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
          url ? <Link href={url} className="text-decoration-none">{title}</Link> : title
        )
      )}
    </React.Fragment>
  );
};

export default Heading;
