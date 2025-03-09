import Newsletter, { NewsletterProps } from '@/components/newsletter/Newsletter';

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
    newsletterTitle?: NewsletterProps['title'];
    summary?: NewsletterProps['summary'];
  },
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
