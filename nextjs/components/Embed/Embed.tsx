import React from 'react';
import './Embed.scss';

interface EmbedProps {
  embed: string;
}

const Embed: React.FC<EmbedProps> = ({ embed }) => {
  return (
    <div dangerouslySetInnerHTML={{ __html: embed }} />
  );
};

export default Embed;
