import { TextFragment, DateTimeFragment, LanguageFragment } from '@/graphql/fragments/misc';
import Newsletter from '@/components/newsletter/Newsletter';

export const ParagraphNewsletterFragment = /* GraphQL */ `
  fragment ParagraphNewsletterFragment on ParagraphNewsletter {
    id
    created {
      ...DateTimeFragment
    }
    langcode {
      ...LanguageFragment
    }
    status
    newsletterTitle: title
    summary {
      ...TextFragment
    }
  }
`;

interface ParagraphNewsletterProps {
  paragraph: {
    id: string;
    newsletterTitle?: string;
    summary?: {
      value?: string;
      processed?: string;
      format?: string;
    }
  },
  modifier?: string,
}

export default function ParagraphNewsletter({ paragraph, modifier }: ParagraphNewsletterProps) {
  const { newsletterTitle, summary } = paragraph;
  
  return (
    <Newsletter
      title={newsletterTitle ?? ''}
      summary={summary?.value ?? ''}
      modifier={modifier}
    />
  );
}
