import React from 'react';
import { FragmentOf, readFragment, graphql } from "gql.tada";
import { DateTimeFragment, LanguageFragment } from "@/graphql/fragments/misc";
import { MediaUnionFragment, SvgMediaFragment, MediaImageFragment, ImageFragment } from "@/graphql/fragments/media";
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

  const thumbMedia = thumb && readFragment(MediaUnionFragment, thumb);
  let thumbData;
  type ThumbImage = { __typename: 'MediaImage' } & FragmentOf<typeof MediaImageFragment>;

  if (thumbMedia && (thumbMedia as ThumbImage).__typename === 'MediaImage') {
    const mediaImage = readFragment(MediaImageFragment, thumbMedia as ThumbImage);
    if (mediaImage.image) {
      const image = readFragment(ImageFragment, mediaImage.image);
      thumbData = { image: { url: image.url } };
    }
  }

  return (
    <div className={`container mx-auto ${modifier ?? 'my-6 lg:my-25'}`}>
      <div className="flex justify-center">
        <Quote
          author={author}
          jobTitle={jobTitle ?? ''}
          logo={logoComponent}
          quote={quote}
          thumb={thumbData}
        />
      </div>
    </div>
  );
}
