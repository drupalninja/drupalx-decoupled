import { FragmentOf, readFragment } from 'gql.tada';
import { ParagraphCardGroupFragment } from '@/graphql/fragments/paragraph';
import Card from '../card/Card';
import './ParagraphCardGroup.scss';

interface ParagraphCardGroupProps {
  paragraph: FragmentOf<typeof ParagraphCardGroupFragment>,
  modifier?: string,
}

export default function ParagraphCardGroup({ paragraph, modifier }: ParagraphCardGroupProps) {
  const { title, card } = readFragment(ParagraphCardGroupFragment, paragraph);

  return (
    <div className={ modifier ?? 'container mb-2 mb-lg-11 mt-6 mt-lg-15' }>
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
    </div>  
  );
}
