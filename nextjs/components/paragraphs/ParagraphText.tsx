import React from 'react';
import { FragmentOf, readFragment } from "gql.tada";
import { TextSummaryFragment, LinkFragment } from "@/graphql/fragments/misc";
import { ParagraphTextFragment } from "@/graphql/fragments/paragraph";
import Text from '@/components/text/Text';

interface ParagraphTextProps {
  paragraph: FragmentOf<typeof ParagraphTextFragment>
  className?: string;
}

export default function ParagraphText({ paragraph, className }: ParagraphTextProps) {
  const { title, body, link, link2, eyebrow, textLayout } = readFragment(ParagraphTextFragment, paragraph);
  const textSummaryFragment = readFragment(TextSummaryFragment, body)
  const linkFragment = readFragment(LinkFragment, link);
  const linkFragment2 = readFragment(LinkFragment, link2);

  return (
    <Text
      title={title}
      body={textSummaryFragment?.value}
      linkFragment={linkFragment}
      linkFragment2={linkFragment2}
      eyebrow={eyebrow}
      textLayout={textLayout}
      className={className}
    />
  );
}
