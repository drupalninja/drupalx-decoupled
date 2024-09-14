import { FragmentOf, readFragment } from 'gql.tada';
import { TextFragment } from '@/graphql/fragments/misc';
import { ParagraphEmbedFragment } from '@/graphql/fragments/paragraph';
import Embed from '@/components/embed/Embed';

interface ParagraphEmbedProps {
  paragraph: FragmentOf<typeof ParagraphEmbedFragment>,
  className?: string,
}

export default function ParagraphEmbed({ paragraph, className }: ParagraphEmbedProps) {
  const { title, script } = readFragment(ParagraphEmbedFragment, paragraph);
  const scriptFragment = readFragment(TextFragment, script);

  return (
    <Embed
      title={title}
      content={scriptFragment?.value ?? ''}
      className={className}
    />
  );
}
