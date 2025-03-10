import Newsletter from '@/components/newsletter/Newsletter';
import { TextFormat } from '@/lib/types';

export const ParagraphNewsletterFragment = /* GraphQL */ `
  fragment ParagraphNewsletterFragment on ParagraphNewsletter {
    newsletterTitle: title
    summary {
      ...TextFragment
    }
  }
`;

interface ParagraphNewsletterProps {
  paragraph: {
    newsletterTitle?: string;
    summary?: TextFormat;
  },
  modifier?: string;
}

export default function ParagraphNewsletter({ paragraph, modifier }: ParagraphNewsletterProps) {
  const { newsletterTitle, summary } = paragraph;

  return (
    <Newsletter
      title={newsletterTitle ?? ''}
      summary={summary}
    />
  );
}
