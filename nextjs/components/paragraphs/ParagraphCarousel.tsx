import React from 'react';
import { DateTimeFragment, LanguageFragment } from '@/graphql/fragments/misc';
import { MediaUnionFragment, MediaImageType } from "@/graphql/fragments/media";
import { getImage } from '@/components/helpers/Utilities';
import Carousel, { CarouselItemData } from '@/components/carousel/Carousel';

export const ParagraphCarouselFragment = /* GraphQL */ `
  fragment ParagraphCarouselFragment on ParagraphCarousel {
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
  }
`;

interface ParagraphCarouselProps {
  paragraph: {
    id: string;
    carouselItem?: Array<{
      media?: {
        __typename: string;
        id: string;
        image?: {
          url: string;
          alt?: string;
          width?: number;
          height?: number;
          variations?: Array<{
            name: string;
            url: string;
            width?: number;
            height?: number;
          }>;
        };
      };
      summary?: string;
      title?: string;
    }>;
  };
  modifier?: string;
}

export default function ParagraphCarousel({ paragraph, modifier }: ParagraphCarouselProps) {
  const { id, carouselItem } = paragraph;
  
  const carouselItems: CarouselItemData[] = (carouselItem || []).map((item) => {
    const mediaImage = item.media && item.media.__typename === 'MediaImage' ? item.media : null;
    
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
