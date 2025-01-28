import React from 'react';
import { FragmentOf, readFragment, graphql } from 'gql.tada';
import { DateTimeFragment, LanguageFragment } from '@/graphql/fragments/misc';
import { MediaUnionFragment, MediaImageType } from "@/graphql/fragments/media";
import { getImage } from '@/components/helpers/Utilities';
import Carousel, { CarouselItemData } from '@/components/carousel/Carousel';

export const ParagraphCarouselFragment = graphql(`fragment ParagraphCarouselFragment on ParagraphCarousel {
  id
  created {
    ...DateTimeFragment
  }
  carouselItem {
    ... on ParagraphCarouselItem {
      media {
        ...MediaUnionFragment
      }
      summary
      title
    }
  }
  langcode {
    ...LanguageFragment
  }
  status
}`,
  [
    DateTimeFragment,
    LanguageFragment,
    MediaUnionFragment,
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
    const mediaImage = mediaFragment ? mediaFragment as MediaImageType : null;

    return {
      media: mediaImage?.image && getImage({
        image: {
          url: mediaImage.image.url,
          alt: mediaImage.image.alt ?? undefined,
          width: mediaImage.image.width,
          height: mediaImage.image.height,
          variations: mediaImage.image.variations?.map(({ name, url, width, height }) => ({
            name, url, width, height
          }))
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
