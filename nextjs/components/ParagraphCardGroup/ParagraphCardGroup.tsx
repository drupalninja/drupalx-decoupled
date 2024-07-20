import { FragmentOf, readFragment } from 'gql.tada';
import { ParagraphCardGroupFragment } from '@/graphql/fragments/paragraph';
import Card from '../Card/Card';

interface ParagraphCardGroupProps {
  paragraph: FragmentOf<typeof ParagraphCardGroupFragment>
}

export default function ParagraphCardGroup({ paragraph }: ParagraphCardGroupProps) {
  const { title, card } = readFragment(ParagraphCardGroupFragment, paragraph);

  return (
    <div className="card-group row">
      {title && (
        <h2 className="card-group-heading mb-4 mb-lg-6 text-center">{title}</h2>
      )}
      {card.map((item: any, index: number) => (
        <div key={index} className="col-sm-6 col-lg-4 mb-4">
          <Card
            modifier="card-group-item"
            heading={{
              title: item?.title,
            }}
            summaryText={item?.summary?.value ?? ''}
            link={item?.link}
            media={item?.media}
          />
        </div>
      ))}
    </div>
  );
}
