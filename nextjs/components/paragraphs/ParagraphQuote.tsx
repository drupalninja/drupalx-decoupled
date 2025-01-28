import React from 'react';
import { FragmentOf, readFragment, graphql } from "gql.tada";
import { DateTimeFragment, LanguageFragment } from "@/graphql/fragments/misc";
import { MediaUnionFragment, SvgMediaFragment, MediaImageType } from "@/graphql/fragments/media";
import { getImage } from "../helpers/Utilities";
import Quote from '@/components/quote/Quote';

export const ParagraphQuoteFragment = graphql(`fragment ParagraphQuoteFragment on ParagraphQuote {
  id
  author
  created {
    ...DateTimeFragment
  }
  jobTitle
  langcode {
    ...LanguageFragment
  }
  logo {
    ...SvgMediaFragment
  }
  quote
  status
  thumb {
    ...MediaUnionFragment
  }
}`,
  [
    DateTimeFragment,
    LanguageFragment,
    SvgMediaFragment,
    MediaUnionFragment,
  ]
)

interface ParagraphQuoteProps {
  paragraph: FragmentOf<typeof ParagraphQuoteFragment>
  modifier?: string
}

export default function ParagraphQuote({ paragraph, modifier }: ParagraphQuoteProps) {
  const { author, jobTitle, logo, quote, thumb } = readFragment(ParagraphQuoteFragment, paragraph);

  const logoComponent = logo ? (
    <div className="w-1/3 mx-auto">
      {getImage(logo, 'w-full h-auto')}
    </div>
  ) : null;

  const thumbMedia = thumb && readFragment(MediaUnionFragment, thumb);
  const mediaImage = thumbMedia ? thumbMedia as MediaImageType : null;

  return (
    <div className={`container mx-auto ${modifier ?? 'my-6 lg:my-25'}`}>
      <div className="flex justify-center">
        <Quote
          author={author}
          jobTitle={jobTitle ?? ''}
          logo={logoComponent}
          quote={quote}
          thumb={mediaImage?.image ? { image: { url: mediaImage.image.url } } : undefined}
        />
      </div>
    </div>
  );
}
