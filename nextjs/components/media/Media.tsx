import React from 'react';

interface MediaProps {
  media: React.ReactNode;
  modifier?: string;
}

export default function Media({ media, modifier }: MediaProps) {
  return (
    <div className={modifier ?? 'w-full'}>
      {media}
    </div>
  );
}
