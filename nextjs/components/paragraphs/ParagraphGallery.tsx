import Gallery from '@/components/gallery/Gallery';
import { getImage, MediaImage } from '@/components/helpers/Utilities';
import { TextFormat } from '@/lib/types';

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

  const mediaNodes = (Array.isArray(mediaItem) ? mediaItem : [])
    .map(item => {
      if (!item.image) {
        return null;
      }

      return getImage(item, 'w-full h-auto rounded-lg', ['I43SMALL', 'I43LARGE2X']);
    })
    .filter(Boolean);

  return (
    <div className={modifier ?? 'container my-6 my-lg-15'}>
      <Gallery
        mediaItems={mediaNodes}
        title={title ?? ''}
        summary={gallerySummary?.value ?? ''}
      />
    </div>
  );
}
