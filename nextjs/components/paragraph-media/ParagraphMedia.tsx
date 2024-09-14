import React from 'react';
import { FragmentOf, readFragment } from 'gql.tada';
import { ParagraphMediaFragment } from '@/graphql/fragments/paragraph';
import Media from '@/components/media/Media';
import { getImage } from '@/components/helpers/Utilities';

interface ParagraphMediaProps {
  paragraph: FragmentOf<typeof ParagraphMediaFragment>;
  modifier?: string;
  imageClassName?: string;
  imageSizes?: string[];
}

export default function ParagraphMedia({
  paragraph,
  modifier,
  imageClassName = 'w-full h-auto rounded',
  imageSizes = ['LARGE', 'I169LARGE2X']
}: ParagraphMediaProps) {
  const { media } = readFragment(ParagraphMediaFragment, paragraph);

  const imageElement = media ? getImage(media, imageClassName, imageSizes) : null;

  return (
    <div className={`container mx-auto px-4 ${modifier ?? 'my-6 lg:my-15'}`}>
      <div className="w-full">
        {imageElement && <Media media={imageElement} />}
      </div>
    </div>
  );
}
