import React from 'react';
import { FragmentOf, readFragment, graphql } from "gql.tada";
import { DateTimeFragment, LanguageFragment } from "@/graphql/fragments/misc";
import { MediaUnionFragment, SvgMediaFragment } from "@/graphql/fragments/media";
import Quote from '@/components/quote/Quote';
import { getImage } from "../helpers/Utilities";

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
      {getImage(logo, 'w-full h-auto', 'I11SMALL')}
    </div>
  ) : null;

  return (
    <div className={`container mx-auto ${modifier ?? 'my-6 lg:my-15'}`}>
      <div className="flex justify-center">
        <Quote
          author={author}
          jobTitle={jobTitle}
          logo={logoComponent}
          quote={quote}
          thumb={thumb}
        />
      </div>
    </div>
  );
}
