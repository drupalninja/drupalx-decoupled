import Gallery from '@/components/gallery/Gallery';
import { getImage } from '@/components/helpers/Utilities';
import { MediaImage, TextFormat } from '@/lib/types';

export const ParagraphGalleryFragment = /* GraphQL */ `
  fragment ParagraphGalleryFragment on ParagraphGallery {
    gallerySummary: body {
      ...TextSummaryFragment
    }
    mediaItem {
      ...MediaUnionFragment
    }
    title
  }
`;

interface ParagraphGalleryProps {
  paragraph: {
    title?: string;
    gallerySummary?: TextFormat;
    mediaItem?: MediaImage[];
  };
  modifier?: string;
}

export default function ParagraphGallery({ paragraph, modifier }: ParagraphGalleryProps) {
  const { title, gallerySummary, mediaItem } = paragraph;

  const mediaItems = (Array.isArray(mediaItem) ? mediaItem : [])
    .map(item => {
      if (!item.image) {
        return null;
      }

      return getImage(item, 'w-full h-auto rounded-lg', ['I43SMALL', 'I43LARGE2X']);
    })
    .filter(Boolean);

  // Extract media IDs for better keys
  const mediaIds = (Array.isArray(mediaItem) ? mediaItem : [])
    .map(item => item.id || '')
    .filter(Boolean);

  return (
    <Gallery
      mediaItems={mediaItems}
      mediaIds={mediaIds}
      title={title ?? ''}
      summary={gallerySummary?.value ?? ''}
      containerClassName={modifier}
    />
  );
}
