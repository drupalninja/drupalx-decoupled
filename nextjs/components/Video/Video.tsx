import React from 'react';
import './Video.scss';

interface VideoProps {
  video: string;
}

const Video: React.FC<VideoProps> = ({ video }) => {
  return (
    <div className="ratio ratio-16x9" dangerouslySetInnerHTML={{ __html: video }}></div>
  );
};

export default Video;
