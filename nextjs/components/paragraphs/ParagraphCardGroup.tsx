import React from 'react';
import { FragmentOf, readFragment } from 'gql.tada';
import { ParagraphCardGroupFragment } from '@/graphql/fragments/paragraph';
import CardGroup from '@/components/card-group/CardGroup';
import { getImage } from '@/components/helpers/Utilities';

interface ParagraphCardGroupProps {
  paragraph: FragmentOf<typeof ParagraphCardGroupFragment>,
  modifier?: string,
}

export default function ParagraphCardGroup({ paragraph, modifier }: ParagraphCardGroupProps) {
  const { title, card } = readFragment(ParagraphCardGroupFragment, paragraph);

  const cardItems = card.map((item: any) => {
    if (item.__typename === 'ParagraphStatsItem') {
      return {
        type: 'stat',
        media: getImage(item?.customIcon, 'w-16 h-16 object-contain mx-auto'),
        heading: item?.title,
        body: item?.statSummary,
      };
    } else {
      return {
        type: 'custom',
        media: getImage(item?.media, 'object-cover w-full h-full'),
        mediaLink: item?.link?.url,
        heading: {
          title: item?.title,
          url: item?.link?.url,
        },
        tags: item?.tags,
        summaryText: item?.summary,
        link: item?.link,
      };
    }
  });

  return (
    <CardGroup
      title={title}
      cards={cardItems}
      modifier={modifier}
    />
  );
}
