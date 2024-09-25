import React from 'react';
import { FragmentOf, readFragment, graphql } from 'gql.tada';
import { TextFragment, DateTimeFragment, LanguageFragment, LinkFragment } from '@/graphql/fragments/misc';
import { MediaUnionFragment } from '@/graphql/fragments/media';
import { getImage } from '@/components/helpers/Utilities';
import Hero from '@/components/hero/Hero';

export const ParagraphHeroFragment = graphql(`fragment ParagraphHeroFragment on ParagraphHero {
  id
  created {
    ...DateTimeFragment
  }
  heading {
    ...TextFragment
  }
  heroLayout
  langcode {
    ...LanguageFragment
  }
  link {
    ...LinkFragment
  }
  link2 {
    ...LinkFragment
  }
  requiredMedia: media {
    ...MediaUnionFragment
  }
  status
  summary {
    ...TextFragment
  }
}`,
  [
    DateTimeFragment,
    TextFragment,
    LanguageFragment,
    LinkFragment,
    MediaUnionFragment,
  ]
)

interface ParagraphHeroProps {
  paragraph: FragmentOf<typeof ParagraphHeroFragment>
  modifier?: string
}

export default function ParagraphHero({ paragraph, modifier }: ParagraphHeroProps) {
  const { requiredMedia, heroLayout, heading, summary, link, link2 } = readFragment(ParagraphHeroFragment, paragraph);
  const summaryFragment = readFragment(TextFragment, summary);
  const linkFragment = readFragment(LinkFragment, link);
  const link2Fragment = readFragment(LinkFragment, link2);
  const headingFragment = readFragment(TextFragment, heading);

  const media = requiredMedia ? getImage(requiredMedia, 'max-w-full h-auto', ['HEROS', 'HEROLX2']) : null;

  return (
    <Hero
      heroLayout={heroLayout}
      media={media}
      heading={headingFragment?.value ?? ''}
      summary={summaryFragment?.value ?? ''}
      link={{
        url: linkFragment?.url ?? '',
        title: linkFragment?.title ?? ''
      }}
      link2={{
        url: link2Fragment?.url ?? '',
        title: link2Fragment?.title ?? ''
      }}
      modifier={modifier}
    />
  );
}
