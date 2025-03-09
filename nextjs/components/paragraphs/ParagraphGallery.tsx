import Gallery from '@/components/gallery/Gallery';
import { getImage } from '@/components/helpers/Utilities';

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

interface MediaItem {
  __typename?: 'MediaImage';
  id?: string;
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
  }
}

interface ParagraphGalleryProps {
  paragraph: {
    id: string;
    title?: string;
    gallerySummary?: {
      value?: string;
      processed?: string;
      format?: string;
      summary?: string;
    };
    mediaItem?: MediaItem[];
  };
  modifier?: string;
}

export default function ParagraphGallery({ paragraph, modifier }: ParagraphGalleryProps) {
  const { title, gallerySummary, mediaItem } = paragraph;

  const mediaNodes = (Array.isArray(mediaItem) ? mediaItem : [])
    .map(item => {
      if (item?.__typename !== 'MediaImage' || !item.image) {
        return null;
      }

      return getImage({
        image: {
          url: item.image.url,
          alt: item.image.alt ?? undefined,
          width: item.image.width,
          height: item.image.height,
          variations: item.image.variations?.map(({ name, url, width, height }) => ({
            name, url, width, height
          }))
        }
      }, 'w-full h-auto rounded-lg', ['I43SMALL', 'I43LARGE2X']);
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
