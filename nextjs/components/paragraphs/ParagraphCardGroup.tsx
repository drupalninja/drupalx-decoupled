import CardGroup from '@/components/card-group/CardGroup';
import { getImage, MediaImage } from '@/components/helpers/Utilities';
import { CustomCardProps } from '@/components/card-group/CardGroup';
import { StatCardProps } from '@/components/stat-card/StatCard';
import { LinkFormat } from '@/lib/types';

export const ParagraphCardFragment = /* GraphQL */ `
  fragment ParagraphCardFragment on ParagraphCard {
    link {
      ...LinkFragment
    }
    media {
      ...MediaUnionFragment
    }
    summary
    title
  }
`;

export const ParagraphStatsItemFragment = /* GraphQL */ `
  fragment ParagraphStatsItemFragment on ParagraphStatsItem {
    customIcon {
      ...SvgMediaFragment
    }
    icon
    statSummary: summary
    title
  }
`;

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
    id: string;
    card?: Array<{
      __typename: 'ParagraphCard' | 'ParagraphStatsItem';
      id: string;
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
      return {
        type: 'stat',
        icon: item.icon,
        media: item.customIcon ? getImage(item.customIcon, 'w-16 h-16 object-contain mx-auto') : null,
        heading: item.title,
        body: item.statSummary,
      } as StatCardProps;
    }

    return {
      type: 'custom',
      media: item.media ? getImage(item.media, 'object-cover w-full h-full') : null,
      mediaLink: item.link?.url,
      heading: {
        title: item.title,
        url: item.link?.url,
      },
      tags: item.tags,
      summaryText: item.summary,
      link: item.link,
    } as CustomCardProps;
  }).filter((item): item is StatCardProps | CustomCardProps => item !== null);

  return (
    <CardGroup
      title={paragraph.title ?? ''}
      cards={cardItems}
      modifier={modifier}
    />
  );
}
