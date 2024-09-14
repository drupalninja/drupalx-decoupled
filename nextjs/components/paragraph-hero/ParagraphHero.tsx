import React from 'react';
import { FragmentOf, readFragment } from 'gql.tada';
import { ParagraphHeroFragment } from '@/graphql/fragments/paragraph';
import { TextFragment, LinkFragment } from '@/graphql/fragments/misc';
import { getImage } from '@/components/helpers/Utilities';
import Hero from '@/components/hero/Hero';

interface ParagraphHeroProps {
  paragraph: FragmentOf<typeof ParagraphHeroFragment>
  modifier?: string
}

export default function ParagraphHero({ paragraph, modifier }: ParagraphHeroProps) {
  const { requiredMedia, heroLayout, heading, summary, link } = readFragment(ParagraphHeroFragment, paragraph);
  const summaryFragment = readFragment(TextFragment, summary);
  const linkFragment = readFragment(LinkFragment, link);
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
      modifier={modifier}
    />
  );
}
