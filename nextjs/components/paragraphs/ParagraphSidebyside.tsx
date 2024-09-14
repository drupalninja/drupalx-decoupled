import React from 'react';
import { FragmentOf, readFragment, graphql } from 'gql.tada';
import { DateTimeFragment, LanguageFragment, TextFragment, LinkFragment } from "@/graphql/fragments/misc";
import { MediaUnionFragment } from "@/graphql/fragments/media";
import { getImage } from '@/components/helpers/Utilities';
import Sidebyside from '@/components/sidebyside/Sidebyside';

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
    TextFragment,
  ]
)

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
      eyebrow={eyebrow ?? ''}
      layout={layout}
      title={sidebysideTitle}
      summary={textFragment?.value ?? ''}
      link={linkFragment as any}
      media={imageContent}
      modifier={modifier}
    />
  );
}
