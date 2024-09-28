import React from 'react';
import { FragmentOf, readFragment, graphql } from 'gql.tada';
import Media from '@/components/media/Media';
import { getImage } from '@/components/helpers/Utilities';
import { DateTimeFragment, LanguageFragment } from '@/graphql/fragments/misc';
import { MediaUnionFragment } from '@/graphql/fragments/media';

export const ParagraphMediaFragment = graphql(`fragment ParagraphMediaFragment on ParagraphMedia {
  id
  created {
    ...DateTimeFragment
  }
  langcode {
    ...LanguageFragment
  }
  media {
    ...MediaUnionFragment
  }
  status
  title
}`,
  [
    DateTimeFragment,
    LanguageFragment,
    MediaUnionFragment,
  ]
)

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
    <div className={`container mx-auto px-4 ${modifier ?? 'my-6 lg:my-25'}`}>
      <div className="w-full">
        {imageElement && <Media media={imageElement} />}
      </div>
    </div>
  );
}
