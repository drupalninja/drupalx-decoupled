import React from 'react';

interface MediaProps {
  media: React.ReactNode;
}

export default function Media({ media }: MediaProps) {
  return (
    <div className="w-full">
      {media}
    </div>
  );
}
