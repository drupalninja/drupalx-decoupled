import { FragmentOf, readFragment } from 'gql.tada';
import { ParagraphViewFragment } from '@/graphql/fragments/paragraph';
import Card from '@/components/card/Card';
import './ParagraphView.scss';

interface ParagraphViewProps {
  paragraph: FragmentOf<typeof ParagraphViewFragment>,
  modifier?: string,
}

export default async function ParagraphView({ paragraph, modifier }: ParagraphViewProps) {
  const { viewsRef: { results } } = readFragment(ParagraphViewFragment, paragraph);

  return (
    <div className={modifier ?? 'my-6 my-lg-15'}>
      <div className='container'>
        <div className={`row`}>
          {results.map((result) => (
            <div className="col-md-6 col-lg-4 mb-2 mb-md-8" key={result.id}>
              <Card
                modifier=""
                heading={{
                  title: result.title,
                  url: result.path,
                }}
                media={result.media}
                mediaLink={result.path}
                summaryText={result.summary}
              />
            </div>
          ))}
        </div>    
      </div>
    </div>
  );
}
