import React from 'react';
import { TextFragment, TextSummaryFragment, DateTimeFragment, LanguageFragment, LinkFragment } from "@/graphql/fragments/misc";
import Text from '@/components/text/Text';

export const ParagraphTextFragment = /* GraphQL */ `
  fragment ParagraphTextFragment on ParagraphText {
    id
    body {
      ...TextSummaryFragment
    }
    textLayout
    eyebrow
    created {
      ...DateTimeFragment
    }
    langcode {
      ...LanguageFragment
    }
    link {
      ...LinkFragment
    }
    link2 {
      ...LinkFragment
    }
    status
    title
  }
`;

interface ParagraphTextProps {
  paragraph: {
    id: string;
    title?: string;
    body?: {
      value?: string;
      processed?: string;
      format?: string;
      summary?: string;
    };
    link?: {
      url?: string;
      title?: string;
      internal?: boolean;
    };
    link2?: {
      url?: string;
      title?: string;
      internal?: boolean;
    };
    eyebrow?: string;
    textLayout?: string;
  };
  className?: string;
}

export default function ParagraphText({ paragraph, className }: ParagraphTextProps) {
  const { title, body, link, link2, eyebrow, textLayout } = paragraph;
  
  const formattedLinkFragment = link ? {
    url: link.url ?? '',
    title: link.title ?? ''
  } : undefined;
  
  const formattedLinkFragment2 = link2 ? {
    url: link2.url ?? '',
    title: link2.title ?? ''
  } : undefined;

  return (
    <Text
      title={title}
      body={body?.value ?? ''}
      linkFragment={formattedLinkFragment}
      linkFragment2={formattedLinkFragment2}
      eyebrow={eyebrow}
      textLayout={textLayout as 'default' | 'centered' | 'buttons-right' | undefined}
      className={className}
    />
  );
}
