import Media from '@/components/media/Media';
import { getImage } from '@/components/helpers/Utilities';
import { MediaImage } from '@/lib/types';

export const ParagraphMediaFragment = /* GraphQL */ `
  fragment ParagraphMediaFragment on ParagraphMedia {
    media {
      ...MediaUnionFragment
    }
    title
  }
`;

interface ParagraphMediaProps {
  paragraph: {
    media?: MediaImage;
    title?: string;
  };
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
  const { media } = paragraph;
  const imageElement = media ? getImage(media, imageClassName, imageSizes) : null;

  return (
    <div className={`container mx-auto px-4 ${modifier ?? 'my-6 lg:my-25'}`}>
      <div className="w-full">
        {imageElement && <Media media={imageElement} />}
      </div>
    </div>
  );
}
