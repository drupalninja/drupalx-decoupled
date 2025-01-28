import React from 'react';
import { FragmentOf, readFragment, graphql, ResultOf } from 'gql.tada';
import { DateTimeFragment, LanguageFragment, LinkFragment } from "@/graphql/fragments/misc"
import { MediaUnionFragment, SvgMediaFragment } from "@/graphql/fragments/media"
import CardGroup from '@/components/card-group/CardGroup';
import { getImage, MediaImage } from '@/components/helpers/Utilities';
import { CustomCardProps } from '@/components/card-group/CardGroup';
import { StatCardProps } from '@/components/stat-card/StatCard';

const ParagraphCardFragment = graphql(`fragment ParagraphCardFragment on ParagraphCard {
  id
  created {
    ...DateTimeFragment
  }
  langcode {
    ...LanguageFragment
  }
  link {
    ...LinkFragment
  }
  media {
    ...MediaUnionFragment
  }
  status
  summary
  title
}`,
  [
    DateTimeFragment,
    LanguageFragment,
    LinkFragment,
    MediaUnionFragment,
  ]
)

export const ParagraphStatsItemFragment = graphql(`fragment ParagraphStatsItemFragment on ParagraphStatsItem {
  id
  created {
    ...DateTimeFragment
  }
  customIcon {
    ...SvgMediaFragment
  }
  icon
  langcode {
    ...LanguageFragment
  }
  status
  statSummary: summary
  title
}`,
  [
    DateTimeFragment,
    SvgMediaFragment,
    LanguageFragment,
  ]
)

export const ParagraphCardGroupFragment = graphql(`fragment ParagraphCardGroupFragment on ParagraphCardGroup {
  id
  card {
    __typename
    ...ParagraphCardFragment
    ...ParagraphStatsItemFragment
  }
  created {
    ...DateTimeFragment
  }
  langcode {
    ...LanguageFragment
  }
  status
  title
}`,
  [
    ParagraphCardFragment,
    ParagraphStatsItemFragment,
    DateTimeFragment,
    LanguageFragment,
  ]
)

interface ParagraphCardGroupProps {
  paragraph: FragmentOf<typeof ParagraphCardGroupFragment>,
  modifier?: string,
}

interface ParagraphStatsItemType {
  __typename: 'ParagraphStatsItem';
  id: string;
  icon?: string;
  customIcon?: MediaImage | null;
  title?: string;
  statSummary?: string;
}

interface ParagraphCardType {
  __typename: 'ParagraphCard';
  id: string;
  title?: string;
  summary?: string;
  link?: { url?: string };
  media?: MediaImage | null;
  tags?: string[];
}

interface ParagraphCardGroupType {
  id: string;
  card: Array<ParagraphStatsItemType | ParagraphCardType>;
  title?: string;
}

export default function ParagraphCardGroup({ paragraph, modifier }: ParagraphCardGroupProps) {
  const fragment = readFragment(ParagraphCardGroupFragment, paragraph) as ParagraphCardGroupType;
  if (!fragment?.card) return null;

  const cardItems = fragment.card.map((item) => {
    if (item.__typename === 'ParagraphStatsItem') {
      const statFragment = readFragment(ParagraphStatsItemFragment, item as FragmentOf<typeof ParagraphStatsItemFragment>) as ParagraphStatsItemType;
      if (!statFragment) return null;
      return {
        type: 'stat',
        icon: statFragment.icon,
        media: statFragment.customIcon ? getImage(statFragment.customIcon, 'w-16 h-16 object-contain mx-auto') : null,
        heading: statFragment.title,
        body: statFragment.statSummary,
      } as StatCardProps;
    }

    const cardFragment = readFragment(ParagraphCardFragment, item as FragmentOf<typeof ParagraphCardFragment>) as ParagraphCardType;
    if (!cardFragment) return null;

    return {
      type: 'custom',
      media: cardFragment.media ? getImage(cardFragment.media, 'object-cover w-full h-full') : null,
      mediaLink: cardFragment.link?.url,
      heading: {
        title: cardFragment.title,
        url: cardFragment.link?.url,
      },
      tags: cardFragment.tags,
      summaryText: cardFragment.summary,
      link: cardFragment.link,
    } as CustomCardProps;
  }).filter((item): item is StatCardProps | CustomCardProps => item !== null);

  return (
    <CardGroup
      title={fragment.title ?? ''}
      cards={cardItems}
      modifier={modifier}
    />
  );
}
