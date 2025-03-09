import { getImage } from "@/components/helpers/Utilities";
import Quote from '@/components/quote/Quote';
import { MediaImage } from '@/lib/types';

export const ParagraphQuoteFragment = /* GraphQL */ `
  fragment ParagraphQuoteFragment on ParagraphQuote {
    author
    jobTitle
    logo {
      ...SvgMediaFragment
    }
    quote
    thumb {
      ...MediaUnionFragment
    }
  }
`;

interface ParagraphQuoteProps {
  paragraph: {
    author?: string;
    jobTitle?: string;
    logo?: MediaImage;
    quote?: string;
    thumb?: MediaImage;
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

  const mediaImage = thumb ? thumb : null;

  return (
    <Quote
      author={author}
      jobTitle={jobTitle ?? ''}
      logo={logoComponent}
      quote={quote ?? ''}
      thumb={mediaImage?.image ? { image: { url: mediaImage.image.url } } : undefined}
      containerClassName={modifier}
    />
  );
}
