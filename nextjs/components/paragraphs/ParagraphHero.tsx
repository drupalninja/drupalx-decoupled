import React from 'react';
import { getImage } from '@/components/helpers/Utilities';
import Hero from '@/components/hero/Hero';
import { TextFragment, LinkFragment } from '@/graphql/fragments/misc';
import { MediaUnionFragment } from '@/graphql/fragments/media';

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

interface ParagraphHeroProps {
  paragraph: {
    id: string;
    requiredMedia?: any;
    heroLayout?: 'image_top' | 'image_bottom' | 'image_bottom_split';
    heading?: {
      value?: string;
      processed?: string;
      format?: string;
    };
    summary?: {
      value?: string;
      processed?: string;
      format?: string;
    };
    link?: {
      url?: string;
      title?: string;
      internal?: boolean;
    };
    link2?: {
      url?: string;
      title?: string;
      internal?: boolean;
    };
  };
  modifier?: string;
}

export default function ParagraphHero({ paragraph, modifier }: ParagraphHeroProps) {
  const { requiredMedia, heroLayout, heading, summary, link, link2 } = paragraph;
  
  const media = requiredMedia ? getImage(requiredMedia, 'max-w-full h-auto', ['HEROS', 'HEROLX2']) : null;
  
  return (
    <Hero
      heroLayout={heroLayout ?? 'image_top'}
      media={media}
      heading={heading?.value ?? ''}
      summary={summary?.value ?? ''}
      link={{
        url: link?.url ?? '',
        title: link?.title ?? ''
      }}
      link2={{
        url: link2?.url ?? '',
        title: link2?.title ?? ''
      }}
      modifier={modifier}
    />
  );
}
