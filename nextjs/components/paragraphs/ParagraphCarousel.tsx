import { getImage } from '@/components/helpers/Utilities';
import Carousel, { CarouselItemData } from '@/components/carousel/Carousel';
import { MediaImage } from '@/lib/types';

export const ParagraphCarouselFragment = /* GraphQL */ `
  fragment ParagraphCarouselFragment on ParagraphCarousel {
    carouselItem {
      ... on ParagraphCarouselItem {
        media {
          ...MediaUnionFragment
        }
        summary
        title
      }
    }
  }
`;

interface ParagraphCarouselProps {
  paragraph: {
    carouselItem?: Array<{
      media?: MediaImage;
      summary?: string;
      title?: string;
    }>;
  };
  modifier?: string;
}

export default function ParagraphCarousel({ paragraph, modifier }: ParagraphCarouselProps) {
  const { carouselItem } = paragraph;

  const carouselItems: CarouselItemData[] = (carouselItem || []).map((item, index) => {
    const mediaImage = item.media ? item.media : null;

    return {
      media: mediaImage?.image && getImage(mediaImage, 'w-full h-full object-cover', ['LARGE', 'I169LARGE2X']),
      title: item.title,
      summary: item.summary,
      id: mediaImage?.id || `carousel-item-${index}`,
    };
  });

  return (
    <Carousel
      items={carouselItems}
      containerClassName={modifier}
    />
  );
}
