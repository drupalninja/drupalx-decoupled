import { FragmentOf, readFragment } from 'gql.tada';
import { TextFragment } from '@/graphql/fragments/misc';
import { ParagraphEmbedFragment } from '@/graphql/fragments/paragraph';
import Heading from '@/components/heading/Heading';
import './ParagraphEmbed.scss';

interface ParagraphEmbedProps {
  paragraph: FragmentOf<typeof ParagraphEmbedFragment>,
  modifier?: string,
}

export default function ParagraphEmbed({ paragraph, modifier }: ParagraphEmbedProps) {
  const { title, script } = readFragment(ParagraphEmbedFragment, paragraph);
  const scriptFragment = readFragment(TextFragment, script);

  return (
    <div className={modifier ?? 'container my-6 my-lg-15'}>
      {title && <Heading level={2} title={title} modifier="mb-2 mb-lg-6" />}
      <div dangerouslySetInnerHTML={{ __html: scriptFragment?.value ?? '' }}></div>
    </div>
  );
}
