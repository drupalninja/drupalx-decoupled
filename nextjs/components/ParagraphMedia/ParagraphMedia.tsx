import { FragmentOf, readFragment } from 'gql.tada';
import { ParagraphMediaFragment } from '@/graphql/fragments/paragraph';
import { getImage } from '../helpers/Utilities';
import './ParagraphMedia.scss';

interface ParagraphMediaProps {
  paragraph: FragmentOf<typeof ParagraphMediaFragment>
}

export default function ParagraphMedia({ paragraph }: ParagraphMediaProps) {
  const { media } = readFragment(ParagraphMediaFragment, paragraph);

  return (
    <div className="flex items-center justify-center">
      {media && (
        <div className="image">
          {getImage(media)}
        </div>
      )}
    </div>
  );
}
