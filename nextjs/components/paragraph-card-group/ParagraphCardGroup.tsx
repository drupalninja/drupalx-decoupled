import React from 'react';
import { FragmentOf, readFragment } from 'gql.tada';
import { ParagraphCardGroupFragment } from '@/graphql/fragments/paragraph';
import Card from '../card/Card';
import Stat from '../stat/Stat';
import { getImage } from '../helpers/Utilities';
import './ParagraphCardGroup.scss';

interface ParagraphCardGroupProps {
  paragraph: FragmentOf<typeof ParagraphCardGroupFragment>,
  modifier?: string,
}

export default function ParagraphCardGroup({ paragraph, modifier }: ParagraphCardGroupProps) {
  const { title, card } = readFragment(ParagraphCardGroupFragment, paragraph);

  const getColumnClass = (totalItems: number, index: number) => {
    if (totalItems === 2) {
      return 'col-sm-6 col-lg-6 mb-4';
    } else if (totalItems === 1) {
      return 'col-12 mb-4';
    } else {
      return 'col-sm-6 col-lg-4 mb-4';
    }
  };

  return (
    <div className={modifier ?? 'container mb-2 mb-lg-11 mt-6 mt-lg-15'}>
      <div className="card-group row">
        {title && (
          <h2 className="card-group-heading mb-4 mb-lg-6 text-center">{title}</h2>
        )}
        {card.map((item: any, index: number) => (
          <div key={index} className={getColumnClass(card.length, index)}>
            {item.__typename === 'ParagraphStatsItem' ? (
              <Stat
                modifier="stat-group-item"
                heading={item?.title}
                body={item?.statSummary}
                media={getImage(item?.customIcon)}
              />
            ) : (
              <Card
                modifier="card-group-item"
                heading={{
                  title: item?.title,
                }}
                summaryText={item?.summary ?? ''}
                link={item?.link}
                media={item?.media}
                tags={item?.tags}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
