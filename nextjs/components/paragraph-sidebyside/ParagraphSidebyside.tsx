import React from 'react';
import { FragmentOf, readFragment } from 'gql.tada';
import { TextFragment, LinkFragment } from "@/graphql/fragments/misc";
import { ParagraphSidebysideFragment } from "@/graphql/fragments/paragraph";
import { getImage } from '@/components/helpers/Utilities';
import Sidebyside from '@/components/sidebyside/Sidebyside';

interface ParagraphSidebysideProps {
  paragraph: FragmentOf<typeof ParagraphSidebysideFragment>,
  modifier?: string,
}

export default function ParagraphSidebyside({ paragraph, modifier }: ParagraphSidebysideProps) {
  const { eyebrow, sidebysideLayout: layout, sidebysideSummary, sidebysideTitle, link, media } = readFragment(ParagraphSidebysideFragment, paragraph);
  const linkFragment = readFragment(LinkFragment, link);
  const textFragment = readFragment(TextFragment, sidebysideSummary);

  const imageContent = getImage(media, 'w-full h-auto', ['I43SMALL', 'I43LARGE2X']);

  return (
    <Sidebyside
      eyebrow={eyebrow}
      layout={layout}
      title={sidebysideTitle}
      summary={textFragment?.value}
      link={linkFragment}
      media={imageContent}
      modifier={modifier}
    />
  );
}
