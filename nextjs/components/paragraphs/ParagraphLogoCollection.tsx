import { FragmentOf, readFragment, graphql } from 'gql.tada';
import { DateTimeFragment, LanguageFragment } from '@/graphql/fragments/misc';
import { MediaUnionFragment } from '@/graphql/fragments/media'

export const ParagraphLogoCollectionFragment = graphql(`
  fragment ParagraphLogoCollectionFragment on ParagraphLogoCollection {
    id
    created {
      ...DateTimeFragment
    }
    langcode {
      ...LanguageFragment
    }
    mediaItem {
      ...MediaUnionFragment
    }
    status
    logo_collectionTitle: title
  }
  `, [DateTimeFragment, LanguageFragment, MediaUnionFragment]);

interface ParagraphLogoCollectionProps {
  paragraph: FragmentOf<typeof ParagraphLogoCollectionFragment>,
}

export default function ParagraphLogoCollection({ paragraph }: ParagraphLogoCollectionProps) {
  const paragraphData = readFragment(ParagraphLogoCollectionFragment, paragraph);

  const DebugView = ({ data }: { data: any }) => (
    <pre style={{ backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '5px', overflow: 'auto' }}>
      {JSON.stringify(data, null, 2)}
    </pre>
  );

  return (
    <div className={'container mx-auto '}>
      {<DebugView data={paragraphData} />}
    </div>
  );
}
