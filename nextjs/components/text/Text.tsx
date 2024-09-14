import React from 'react';
import { Button } from "@/components/ui/button";
import { LinkFragment } from "@/graphql/fragments/misc";

interface TextProps {
  title?: string;
  body?: string;
  linkFragment?: LinkFragment;
  linkFragment2?: LinkFragment;
  eyebrow?: string;
  textLayout?: string;
  className?: string;
}

export default function Text({
  title,
  body,
  linkFragment,
  linkFragment2,
  eyebrow,
  textLayout,
  className
}: TextProps) {
  const containerClasses = `container mx-auto my-6 lg:my-15 ${className || ''}`;
  const contentClasses = `max-w-4xl ${textLayout === 'centered' ? 'mx-auto text-center' : ''}`;

  return (
    <div className={containerClasses}>
      <div className={contentClasses}>
        {eyebrow && (
          <h6 className="text-sm font-semibold uppercase tracking-wide text-gray-500">{eyebrow}</h6>
        )}
        {title && (
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">{title}</h2>
        )}
        {body && (
          <div className="mt-4 text-xl text-gray-500" dangerouslySetInnerHTML={{ __html: body }}></div>
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
