import CardGroup from '@/components/card-group/CardGroup';
import { CustomCardProps } from '@/components/card-group/CardGroup';
import { StatCardProps } from '@/components/stat-card/StatCard';
import { LinkFormat, MediaImage } from '@/lib/types';
import { ParagraphStatsItemType, transformStatsItem } from './ParagraphStatsItem';
import { ParagraphCardType, transformCard } from './ParagraphCard';

export const ParagraphCardGroupFragment = /* GraphQL */ `
  fragment ParagraphCardGroupFragment on ParagraphCardGroup {
    card {
      __typename
      ...ParagraphCardFragment
      ...ParagraphStatsItemFragment
    }
    title
  }
`;

interface ParagraphCardGroupProps {
  paragraph: {
    card?: Array<{
      __typename: 'ParagraphCard' | 'ParagraphStatsItem';
      title?: string;
      summary?: string;
      statSummary?: string;
      link?: LinkFormat;
      media?: MediaImage | null;
      tags?: string[];
      icon?: string;
      customIcon?: MediaImage | null;
    }>;
    title?: string;
  },
  modifier?: string,
}

export default function ParagraphCardGroup({ paragraph, modifier }: ParagraphCardGroupProps) {
  if (!paragraph?.card) return null;

  const cardItems = paragraph.card.map((item) => {
    if (item.__typename === 'ParagraphStatsItem') {
      return transformStatsItem(item as ParagraphStatsItemType);
    }

    return transformCard(item as ParagraphCardType);
  }).filter((item): item is StatCardProps | CustomCardProps => item !== null);

  return (
    <CardGroup
      title={paragraph.title ?? ''}
      cards={cardItems}
      modifier={modifier}
    />
  );
}
