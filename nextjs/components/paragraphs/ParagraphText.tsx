import Text, { TextProps } from '@/components/text/Text';

export const ParagraphTextFragment = /* GraphQL */ `
  fragment ParagraphTextFragment on ParagraphText {
    body {
      ...TextSummaryFragment
    }
    textLayout
    eyebrow
    link {
      ...LinkFragment
    }
    link2 {
      ...LinkFragment
    }
    title
  }
`;

interface ParagraphTextProps {
  paragraph: TextProps;
  className?: string;
}

export default function ParagraphText({ paragraph, className }: ParagraphTextProps) {
  const { title, body, link, link2, eyebrow, textLayout } = paragraph;

  return (
    <Text
      title={title}
      body={body}
      link={link}
      link2={link2}
      eyebrow={eyebrow}
      textLayout={textLayout as 'default' | 'centered' | 'buttons-right' | undefined}
      className={className}
    />
  );
}
