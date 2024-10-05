import React from 'react';
import { FragmentOf, readFragment, graphql } from 'gql.tada';
import { DateTimeFragment, LanguageFragment, TextFragment, LinkFragment } from "@/graphql/fragments/misc";
import { MediaUnionFragment } from "@/graphql/fragments/media";
import { getImage } from '@/components/helpers/Utilities';
import Sidebyside from '@/components/sidebyside/Sidebyside';
import { StatCardProps } from '@/components/stat-card/StatCard';
import { ParagraphStatsItemFragment } from './ParagraphCardGroup';

export const ParagraphBulletFragment = graphql(`fragment ParagraphBulletFragment on ParagraphBullet {
  id
  created {
    ...DateTimeFragment
  }
  bulletIcon: icon
  langcode {
    ...LanguageFragment
  }
  status
  bulletSummary: summary {
    ...TextFragment
  }
}`,
  [
    DateTimeFragment,
    LanguageFragment,
  ]
)

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
  features {
    __typename
    ...ParagraphStatsItemFragment
    ...ParagraphBulletFragment
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
    ParagraphBulletFragment,
    TextFragment,
  ]
)

interface ParagraphSidebysideProps {
  paragraph: FragmentOf<typeof ParagraphSidebysideFragment>,
  modifier?: string,
}

export default function ParagraphSidebyside({ paragraph, modifier }: ParagraphSidebysideProps) {
  const { eyebrow, sidebysideLayout: layout, sidebysideSummary, sidebysideTitle, link, media, features } = readFragment(ParagraphSidebysideFragment, paragraph);
  const linkFragment = readFragment(LinkFragment, link);
  const textFragment = readFragment(TextFragment, sidebysideSummary);
  const imageContent = getImage(media, 'w-full h-auto rounded-lg', ['I43SMALL', 'I43LARGE2X']);

  const featureItems = features ? (features as Array<any>).map((feature) => {
    if (feature.__typename === 'ParagraphStatsItem') {
      const stat: any = readFragment(ParagraphStatsItemFragment, feature);
      return {
        type: 'stat',
        media: getImage(stat?.customIcon, 'w-16 h-16 object-contain mx-auto'),
        heading: stat.title ?? '',
        body: stat.statSummary ?? '',
        icon: stat.icon,
        border: false,
        layout: 'left',
      } as StatCardProps;
    } else if (feature.__typename === 'ParagraphBullet') {
      const bullet: any = readFragment(ParagraphBulletFragment, feature);
      return {
        type: 'bullet',
        icon: bullet?.bulletIcon,
        summary: bullet?.bulletSummary?.value,
      };
    }
    return null;
  }).filter(Boolean) : [];

  return (
    <Sidebyside
      eyebrow={eyebrow ?? ''}
      layout={layout}
      title={sidebysideTitle}
      summary={textFragment?.value ?? ''}
      link={linkFragment as any}
      media={imageContent}
      modifier={modifier}
      features={featureItems as any}
    />
  );
}
