import { getImage } from '@/components/helpers/Utilities';
import Hero, { HeroProps } from '@/components/hero/Hero';
import { MediaImage } from '@/lib/types';

export const ParagraphHeroFragment = /* GraphQL */ `
  fragment ParagraphHeroFragment on ParagraphHero {
    heading {
      ...TextFragment
    }
    heroLayout
    link {
      ...LinkFragment
    }
    link2 {
      ...LinkFragment
    }
    requiredMedia: media {
      ...MediaUnionFragment
    }
    summary {
      ...TextFragment
    }
  }
`;

interface ParagraphHeroData extends HeroProps {
  id: string;
  requiredMedia?: MediaImage;
}

interface ParagraphHeroProps {
  paragraph: ParagraphHeroData;
  modifier?: string;
}

export default function ParagraphHero({ paragraph, modifier }: ParagraphHeroProps) {
  const { requiredMedia, heroLayout, heading, summary, link, link2 } = paragraph;
  const media = requiredMedia ? getImage(requiredMedia, 'max-w-full h-auto', ['HEROS', 'HEROLX2']) : null;

  return (
    <Hero
      heroLayout={heroLayout}
      media={media}
      heading={heading}
      summary={summary}
      link={link}
      link2={link2}
      modifier={modifier}
    />
  );
}
