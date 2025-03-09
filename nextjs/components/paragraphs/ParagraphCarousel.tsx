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
      key: mediaImage?.id || `carousel-item-${index}`,
      media: mediaImage?.image && getImage(mediaImage, 'w-full h-full object-cover', ['LARGE', 'I169LARGE2X']),
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
