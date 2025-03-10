import { getImage } from '@/components/helpers/Utilities';
import Sidebyside, { BulletProps } from '@/components/sidebyside/Sidebyside';
import { StatCardProps } from '@/components/stat-card/StatCard';
import { LinkFormat, MediaImage, TextFormat } from '@/lib/types';
import { ParagraphStatsItemType, transformStatsItem } from './ParagraphStatsItem';
import { ParagraphBulletType, transformBullet } from './ParagraphBullet';

export const ParagraphSidebysideFragment = /* GraphQL */ `
  fragment ParagraphSidebysideFragment on ParagraphSidebyside {
    eyebrow
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
    sidebysideSummary: summary {
      ...TextFragment
    }
    sidebysideTitle: title
  }
`;

interface StatFeature extends StatCardProps {
  type: 'stat';
}

type Feature = BulletProps | StatFeature;
type ParagraphFeature = ParagraphStatsItemType | ParagraphBulletType;

interface ParagraphSidebysideProps {
  paragraph: {
    eyebrow?: string;
    sidebysideLayout?: string;
    sidebysideSummary?: TextFormat;
    sidebysideTitle?: string;
    link?: LinkFormat;
    media?: MediaImage;
    features?: ParagraphFeature[];
  };
  modifier?: string;
}

export default function ParagraphSidebyside({ paragraph, modifier }: ParagraphSidebysideProps) {
  const { eyebrow, sidebysideLayout: layout, sidebysideSummary, sidebysideTitle, link, media, features } = paragraph;
  const imageContent = media ? getImage(media, 'w-full h-auto rounded-lg', ['I43SMALL', 'I43LARGE2X']) : null;

  const featureItems: Feature[] = features ? features.map((feature) => {
    if (feature.__typename === 'ParagraphStatsItem') {
      const statCard = transformStatsItem(feature as ParagraphStatsItemType);
      return {
        ...statCard,
        border: false,
        layout: 'left',
      } as StatFeature;
    }
    else if (feature.__typename === 'ParagraphBullet') {
      return transformBullet(feature as ParagraphBulletType);
    }
    return null;
  }).filter((item): item is Feature => item !== null) : [];

  return (
    <Sidebyside
      eyebrow={eyebrow ?? ''}
      layout={layout}
      title={sidebysideTitle ?? ''}
      summary={sidebysideSummary?.value ?? ''}
      link={link}
      media={imageContent}
      modifier={modifier}
      features={featureItems}
    />
  );
}
