import { FragmentOf, readFragment, graphql } from 'gql.tada';
import { TextFragment, DateTimeFragment, LanguageFragment } from '@/graphql/fragments/misc';
import Embed from '@/components/embed/Embed';

export const ParagraphEmbedFragment = graphql(`fragment ParagraphEmbedFragment on ParagraphEmbed {
  id
  created {
    ...DateTimeFragment
  }
  langcode {
    ...LanguageFragment
  }
  script {
    ...TextFragment
  }
  status
  title
}`,
  [
    DateTimeFragment,
    LanguageFragment,
    TextFragment,
  ]
);

interface ParagraphEmbedProps {
  paragraph: FragmentOf<typeof ParagraphEmbedFragment>,
  className?: string,
}

export default function ParagraphEmbed({ paragraph, className }: ParagraphEmbedProps) {
  const { title, script } = readFragment(ParagraphEmbedFragment, paragraph);
  const scriptFragment = readFragment(TextFragment, script);

  return (
    <Embed
      title={title ?? ''}
      content={scriptFragment?.value ?? ''}
      className={className}
    />
  );
}
