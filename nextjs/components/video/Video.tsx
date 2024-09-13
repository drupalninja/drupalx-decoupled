import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface VideoProps {
  video: string;
}

const Video: React.FC<VideoProps> = ({ video }) => {
  return (
    <Card className="w-full">
      <CardContent className="p-0">
        <div className="relative w-full pt-[56.25%]">
          <div
            className="absolute inset-0"
            dangerouslySetInnerHTML={{ __html: video }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default Video;
