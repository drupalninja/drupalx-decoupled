import { FragmentOf, readFragment, graphql } from 'gql.tada';
import { TextFragment, DateTimeFragment, LanguageFragment } from '@/graphql/fragments/misc';
import Newsletter from '@/components/newsletter/Newsletter';

export const ParagraphNewsletterFragment = graphql(`fragment ParagraphNewsletterFragment on ParagraphNewsletter {
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
}`,
  [
    DateTimeFragment,
    LanguageFragment,
    TextFragment,
  ]
)

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
