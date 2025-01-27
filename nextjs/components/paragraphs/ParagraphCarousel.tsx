import React from 'react';
import { FragmentOf, readFragment, graphql } from 'gql.tada';
import { DateTimeFragment, LanguageFragment } from '@/graphql/fragments/misc';
import { MediaUnionFragment, MediaImageFragment, ImageFragment } from '@/graphql/fragments/media';
import Carousel, { CarouselItemData } from '@/components/carousel/Carousel';
import { getImage } from '@/components/helpers/Utilities';

export const ParagraphCarouselItemFragment = graphql(`fragment ParagraphCarouselItemFragment on ParagraphCarouselItem {
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
  summary
  title
}`,
  [
    DateTimeFragment,
    LanguageFragment,
    MediaUnionFragment,
  ]
)

export const ParagraphCarouselFragment = graphql(`fragment ParagraphCarouselFragment on ParagraphCarousel {
  id
  carouselItem {
    ...ParagraphCarouselItemFragment
  }
  created {
    ...DateTimeFragment
  }
  langcode {
    ...LanguageFragment
  }
  status
}`,
  [
    ParagraphCarouselItemFragment,
    DateTimeFragment,
    LanguageFragment,
  ]
)

interface ParagraphCarouselProps {
  paragraph: FragmentOf<typeof ParagraphCarouselFragment>;
  modifier?: string;
}

export default function ParagraphCarousel({ paragraph, modifier }: ParagraphCarouselProps) {
  const { id, carouselItem } = readFragment(ParagraphCarouselFragment, paragraph);

  const carouselItems: CarouselItemData[] = (carouselItem as any[]).map((item) => {
    const mediaFragment = readFragment(MediaUnionFragment, item.media);
    const mediaImage = mediaFragment && mediaFragment.__typename === 'MediaImage'
      ? readFragment(MediaImageFragment, mediaFragment)
      : null;
    const imageFragment = mediaImage?.image && readFragment(ImageFragment, mediaImage.image);

    return {
      media: imageFragment && getImage({
        image: {
          url: imageFragment.url,
          alt: imageFragment.alt ?? undefined,
          width: imageFragment.width,
          height: imageFragment.height,
          variations: imageFragment.variations ?? undefined
        }
      }, 'w-full h-full object-cover', ['LARGE', 'I169LARGE2X']),
      title: item.title,
      summary: item.summary,
    };
  });

  return (
    <div className={`container mx-auto px-4 ${modifier || 'my-25'}`}>
      <Carousel items={carouselItems} />
    </div>
  );
}
