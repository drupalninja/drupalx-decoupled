import Embed from '@/components/embed/Embed';
import { TextFormat } from '@/lib/types';

export const ParagraphEmbedFragment = /* GraphQL */ `
  fragment ParagraphEmbedFragment on ParagraphEmbed {
    script {
      ...TextFragment
    }
    title
  }
`;

interface ParagraphEmbedProps {
  paragraph: {
    title?: string;
    script?: TextFormat;
  };
  modifier?: string;
}

export default function ParagraphEmbed({ paragraph, modifier }: ParagraphEmbedProps) {
  const { title, script } = paragraph;

  return (
    <Embed
      title={title ?? ''}
      content={script?.value ?? ''}
      modifier={modifier}
    />
  );
}
