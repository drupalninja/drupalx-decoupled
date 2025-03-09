import React from 'react';
import { DateTimeFragment, LanguageFragment } from "@/graphql/fragments/misc";
import { MediaUnionFragment, SvgMediaFragment, MediaImageType } from "@/graphql/fragments/media";
import { getImage } from "../helpers/Utilities";
import Quote from '@/components/quote/Quote';

export const ParagraphQuoteFragment = /* GraphQL */ `
  fragment ParagraphQuoteFragment on ParagraphQuote {
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
  }
`;

interface ParagraphQuoteProps {
  paragraph: {
    id: string;
    author?: string;
    jobTitle?: string;
    logo?: {
      id: string;
      __typename: string;
      image?: {
        url: string;
        alt?: string;
        width?: number;
        height?: number;
      };
    };
    quote?: string;
    thumb?: {
      __typename: string;
      id: string;
      image?: {
        url: string;
        alt?: string;
        width?: number;
        height?: number;
      };
    };
  };
  modifier?: string;
}

export default function ParagraphQuote({ paragraph, modifier }: ParagraphQuoteProps) {
  const { author, jobTitle, logo, quote, thumb } = paragraph;
  
  const logoComponent = logo ? (
    <div className="w-1/3 mx-auto">
      {getImage(logo, 'w-full h-auto')}
    </div>
  ) : null;
  
  const mediaImage = thumb && thumb.__typename === 'MediaImage' ? thumb : null;
  
  return (
    <div className={`container mx-auto ${modifier ?? 'my-6 lg:my-25'}`}>
      <div className="flex justify-center">
        <Quote
          author={author}
          jobTitle={jobTitle ?? ''}
          logo={logoComponent}
          quote={quote ?? ''}
          thumb={mediaImage?.image ? { image: { url: mediaImage.image.url } } : undefined}
        />
      </div>
    </div>
  );
}
