import React from 'react';

interface RichTextProps {
  bodyText: string;
}

const RichText: React.FC<RichTextProps> = ({ bodyText }) => {
  return (
    <div className="rich-text">
      <div dangerouslySetInnerHTML={{ __html: bodyText }} />
    </div>
  );
};

export default RichText;
