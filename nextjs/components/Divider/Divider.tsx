import React from 'react';
import './Divider.scss';

interface DividerProps {
  className?: string;
}

const Divider: React.FC<DividerProps> = ({ className }) => {
  return (
    <hr className={className} />
  );
};

export default Divider;
