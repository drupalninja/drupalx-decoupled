import { getImage, MediaImage } from '@/components/helpers/Utilities';
import Sidebyside, { BulletProps } from '@/components/sidebyside/Sidebyside';
import { StatCardProps } from '@/components/stat-card/StatCard';

export const ParagraphBulletFragment = /* GraphQL */ `
  fragment ParagraphBulletFragment on ParagraphBullet {
    bulletIcon: icon
    bulletSummary: summary {
      ...TextFragment
    }
  }
`;

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

interface ParagraphStatsItemType {
  __typename: 'ParagraphStatsItem';
  customIcon?: MediaImage;
  title?: string;
  statSummary?: string;
  icon?: string;
}

interface ParagraphBulletType {
  __typename: 'ParagraphBullet';
  bulletIcon?: BulletProps['icon'];
  bulletSummary?: { value?: string };
}

type ParagraphFeature = ParagraphStatsItemType | ParagraphBulletType;

interface ParagraphSidebysideProps {
  paragraph: {
    eyebrow?: string;
    sidebysideLayout?: string;
    sidebysideSummary?: { value?: string };
    sidebysideTitle?: string;
    link?: { url?: string; title?: string };
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
      const stat = feature as ParagraphStatsItemType;
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
      const bullet = feature as ParagraphBulletType;
      return {
        type: 'bullet',
        icon: bullet.bulletIcon || '',
        summary: bullet.bulletSummary?.value || '',
      } as BulletProps;
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
