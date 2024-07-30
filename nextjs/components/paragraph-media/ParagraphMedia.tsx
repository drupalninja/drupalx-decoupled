import { FragmentOf, readFragment } from 'gql.tada';
import { ParagraphMediaFragment } from '@/graphql/fragments/paragraph';
import { getImage } from '../helpers/Utilities';
import './ParagraphMedia.scss';

interface ParagraphMediaProps {
  paragraph: FragmentOf<typeof ParagraphMediaFragment>,
  modifier?: string,
}

export default function ParagraphMedia({ paragraph, modifier }: ParagraphMediaProps) {
  const { media } = readFragment(ParagraphMediaFragment, paragraph);

  return (
    <div className={ modifier ?? 'container my-6 my-lg-15' }>
      <div className="flex items-center justify-center">
        {media && (
          <div className="image">
            {getImage(media, 'img-fluid rounded', ['LARGE', 'I169LARGE2X'])}
          </div>
        )}
      </div>
    </div>
  );
}
