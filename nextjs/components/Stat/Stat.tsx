import React from 'react';
import './Stat.scss';

interface StatProps {
  media?: React.ReactNode;
  heading?: string;
  body?: string;
  modifier?: string;
}

const Stat: React.FC<StatProps> = ({ media, heading, body, modifier }) => {
  return (
    <div className={`stat-item text-center ${modifier}`}>
      <div className="stat-icon mx-auto">
        {media}
      </div>
      <h3>{heading}</h3>
      {body && <p className="mb-0">{body}</p>}
    </div>
  );
};

export default Stat;
