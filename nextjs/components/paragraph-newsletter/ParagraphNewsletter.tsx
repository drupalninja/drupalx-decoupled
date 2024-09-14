import { FragmentOf, readFragment } from 'gql.tada';
import { ParagraphNewsletterFragment } from '@/graphql/fragments/paragraph';
import { TextFragment } from '@/graphql/fragments/misc';
import Newsletter from '@/components/newsletter/Newsletter';

interface ParagraphNewsletterProps {
  paragraph: FragmentOf<typeof ParagraphNewsletterFragment>,
  modifier?: string,
}

export default function ParagraphNewsletter({ paragraph, modifier }: ParagraphNewsletterProps) {
  const { newsletterTitle, summary } = readFragment(ParagraphNewsletterFragment, paragraph);
  const summaryFragment = readFragment(TextFragment, summary);

  return (
    <Newsletter
      title={newsletterTitle}
      summary={summaryFragment?.value ?? ''}
      modifier={modifier}
    />
  );
}
