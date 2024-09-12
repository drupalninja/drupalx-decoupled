import React from 'react';
import { FragmentOf, readFragment } from "gql.tada";
import { TextSummaryFragment, LinkFragment } from "@/graphql/fragments/misc";
import { ParagraphTextFragment } from "@/graphql/fragments/paragraph";
import { Button } from "@/components/ui/button";

interface ParagraphTextProps {
  paragraph: FragmentOf<typeof ParagraphTextFragment>
  className?: string;
}

export default function ParagraphText({ paragraph, className }: ParagraphTextProps) {
  const { title, body, link, link2, eyebrow, textLayout } = readFragment(ParagraphTextFragment, paragraph);
  const textSummaryFragment = readFragment(TextSummaryFragment, body)
  const linkFragment = readFragment(LinkFragment, link);
  const linkFragment2 = readFragment(LinkFragment, link2);

  const containerClasses = `container mx-auto my-6 lg:my-15 ${className || ''}`;
  const contentClasses = `max-w-4xl ${textLayout === 'centered' ? 'mx-auto text-center' : ''}`;

  return (
    <div className={containerClasses}>
      <div className={contentClasses}>
        {eyebrow && (
          <h6 className="text-sm font-semibold uppercase tracking-wide text-gray-500">{eyebrow}</h6>
        )}
        {title && (
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">{title}</h2>
        )}
        {body && (
          <div className="mt-4 text-xl text-gray-500" dangerouslySetInnerHTML={{ __html: textSummaryFragment?.value ?? '' }}></div>
        )}
        <div className={`mt-6 flex ${textLayout === 'centered' ? 'justify-center' : ''}`}>
          {linkFragment?.url && (
            <Button
              variant="default"
              className="mr-4"
              asChild
            >
              <a href={linkFragment.url}>{linkFragment.title || 'Read more'}</a>
            </Button>
          )}
          {linkFragment2?.url && (
            <Button
              variant="secondary"
              asChild
            >
              <a href={linkFragment2.url}>{linkFragment2.title || 'Read more'}</a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
