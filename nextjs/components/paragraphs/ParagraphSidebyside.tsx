import React from 'react';
import { FragmentOf, readFragment, graphql } from 'gql.tada';
import { DateTimeFragment, LanguageFragment, TextFragment, LinkFragment } from "@/graphql/fragments/misc";
import { MediaUnionFragment } from "@/graphql/fragments/media";
import { getImage, MediaImage } from '@/components/helpers/Utilities';
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

interface BulletFeature {
  type: 'bullet';
  icon: string;
  summary: string;
}

interface StatFeature extends StatCardProps {
  type: 'stat';
}

type Feature = BulletFeature | StatFeature;

interface LinkType {
  url?: string;
  title?: string;
}

interface ParagraphStatsItemType {
  __typename: 'ParagraphStatsItem';
  customIcon?: MediaImage;
  title?: string;
  statSummary?: string;
  icon?: string;
}

interface ParagraphBulletType {
  __typename: 'ParagraphBullet';
  bulletIcon?: string;
  bulletSummary?: { value?: string };
}

type ParagraphFeature = ParagraphStatsItemType | ParagraphBulletType;

interface ParagraphSidebysideProps {
  paragraph: FragmentOf<typeof ParagraphSidebysideFragment>;
  modifier?: string;
}

export default function ParagraphSidebyside({ paragraph, modifier }: ParagraphSidebysideProps) {
  const { eyebrow, sidebysideLayout: layout, sidebysideSummary, sidebysideTitle, link, media, features } = readFragment(ParagraphSidebysideFragment, paragraph);
  const linkFragment = readFragment(LinkFragment, link);
  const textFragment = readFragment(TextFragment, sidebysideSummary);
  const imageContent = getImage(media, 'w-full h-auto rounded-lg', ['I43SMALL', 'I43LARGE2X']);

  const featureItems: Feature[] = features ? (features as ParagraphFeature[]).map((feature) => {
    if (feature.__typename === 'ParagraphStatsItem') {
      const stat = readFragment(ParagraphStatsItemFragment, feature as FragmentOf<typeof ParagraphStatsItemFragment>) as ParagraphStatsItemType;
      const mediaImage = stat.customIcon || {} as MediaImage;
      return {
        type: 'stat',
        media: getImage(mediaImage, 'w-16 h-16 object-contain mx-auto'),
        heading: stat.title ?? '',
        body: stat.statSummary ?? '',
        icon: stat.icon ?? '',
        border: false,
        layout: 'left',
      } as StatFeature;
    } else if (feature.__typename === 'ParagraphBullet') {
      const bullet = readFragment(ParagraphBulletFragment, feature as FragmentOf<typeof ParagraphBulletFragment>) as ParagraphBulletType;
      return {
        type: 'bullet',
        icon: bullet.bulletIcon || '',
        summary: bullet.bulletSummary?.value || '',
      } as BulletFeature;
    }
    return null;
  }).filter((item): item is Feature => item !== null) : [];

  const linkData: LinkType = {
    url: linkFragment?.url || undefined,
    title: linkFragment?.title || undefined
  };

  return (
    <Sidebyside
      eyebrow={eyebrow ?? ''}
      layout={layout}
      title={sidebysideTitle}
      summary={textFragment?.value ?? ''}
      link={linkData}
      media={imageContent}
      modifier={modifier}
      features={featureItems}
    />
  );
}
