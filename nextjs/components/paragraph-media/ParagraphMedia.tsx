import { FragmentOf, readFragment } from 'gql.tada';
import { ParagraphMediaFragment } from '@/graphql/fragments/paragraph';
import { getImage } from '../helpers/Utilities';

interface ParagraphMediaProps {
  paragraph: FragmentOf<typeof ParagraphMediaFragment>,
  modifier?: string,
}

export default function ParagraphMedia({ paragraph, modifier }: ParagraphMediaProps) {
  const { media } = readFragment(ParagraphMediaFragment, paragraph);

  return (
    <div className={`container mx-auto px-4 ${modifier ?? 'my-6 lg:my-15'}`}>
      <div className="w-full">
        {media && (
          <div className="w-full">
            {getImage(media, 'w-full h-auto rounded', ['LARGE', 'I169LARGE2X'])}
          </div>
        )}
      </div>
    </div>
  );
}
