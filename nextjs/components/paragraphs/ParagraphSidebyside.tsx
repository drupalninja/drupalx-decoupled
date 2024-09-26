import React from 'react';
import { FragmentOf, readFragment, graphql } from 'gql.tada';
import { DateTimeFragment, LanguageFragment, TextFragment, LinkFragment } from "@/graphql/fragments/misc";
import { MediaUnionFragment } from "@/graphql/fragments/media";
import { getImage } from '@/components/helpers/Utilities';
import Sidebyside from '@/components/sidebyside/Sidebyside';
import { StatCardProps } from '@/components/stat-card/StatCard';
import { ParagraphStatsItemFragment } from './ParagraphCardGroup';

export const ParagraphSidebysideFragment = graphql(`fragment ParagraphSidebysideFragment on ParagraphSidebyside {
  id
  created {
    ...DateTimeFragment
  }
  eyebrow
  langcode {
    ...LanguageFragment
  }
  link {
    ...LinkFragment
  }
  media {
    ...MediaUnionFragment
  }
  stats {
    ...ParagraphStatsItemFragment
  }
  sidebysideLayout
  status
  sidebysideSummary: summary {
    ...TextFragment
  }
  sidebysideTitle: title
}`,
  [
    DateTimeFragment,
    LanguageFragment,
    LinkFragment,
    MediaUnionFragment,
    ParagraphStatsItemFragment,
    TextFragment,
  ]
)

interface ParagraphSidebysideProps {
  paragraph: FragmentOf<typeof ParagraphSidebysideFragment>,
  modifier?: string,
}

export default function ParagraphSidebyside({ paragraph, modifier }: ParagraphSidebysideProps) {
  const { eyebrow, sidebysideLayout: layout, sidebysideSummary, sidebysideTitle, link, media, stats } = readFragment(ParagraphSidebysideFragment, paragraph);
  const linkFragment = readFragment(LinkFragment, link);
  const textFragment = readFragment(TextFragment, sidebysideSummary);
  const statsFragment = readFragment(ParagraphStatsItemFragment, stats);
  const imageContent = getImage(media, 'w-full h-auto rounded-lg', ['I43SMALL', 'I43LARGE2X']);

  const statItems: StatCardProps[] = statsFragment ? (statsFragment as any[]).map((stat) => ({
    type: 'stat',
    media: getImage(stat?.customIcon, 'w-16 h-16 object-contain mx-auto'),
    heading: stat.title ?? '',
    body: stat.statSummary ?? '',
    icon: stat.icon,
    border: false,
    layout: 'left',
  })) : [];

  return (
    <Sidebyside
      eyebrow={eyebrow ?? ''}
      layout={layout}
      title={sidebysideTitle}
      summary={textFragment?.value ?? ''}
      link={linkFragment as any}
      media={imageContent}
      modifier={modifier}
      stats={statItems}
    />
  );
}
