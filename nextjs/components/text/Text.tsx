import React from 'react';
import { Button } from "@/components/ui/button";

interface TextProps {
  title?: string;
  body?: string;
  linkFragment?: {
    url: string;
    title: string;
  };
  linkFragment2?: {
    url: string;
    title: string;
  };
  eyebrow?: string;
  textLayout?: 'default' | 'centered' | 'buttons-right';
  className?: string;
}

export default function Text({
  title,
  body,
  linkFragment,
  linkFragment2,
  eyebrow,
  textLayout = 'default',
  className
}: TextProps) {
  const containerClasses = `container mx-auto my-6 lg:my-25 ${className || ''}`;
  const contentClasses = `max-w-4xl ${textLayout === 'centered' ? 'mx-auto text-center' : ''}`;

  const renderButtons = () => {
    let buttonContainerClasses = "mt-6 flex ";
    if (textLayout === 'centered') {
      buttonContainerClasses += "justify-center";
    } else if (textLayout === 'buttons-right') {
      buttonContainerClasses += "justify-start lg:justify-end";
    } else {
      buttonContainerClasses += "justify-start";
    }

    return (
      <div className={buttonContainerClasses}>
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
    );
  };

  const renderContent = () => (
    <>
      {eyebrow && (
        <h6 className="text-sm font-semibold uppercase tracking-wide text-gray-500">{eyebrow}</h6>
      )}
      {title && (
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">{title}</h2>
      )}
      {body && (
        <div className="mt-4 text-xl text-gray-500" dangerouslySetInnerHTML={{ __html: body }}></div>
      )}
    </>
  );

  if (textLayout === 'buttons-right') {
    return (
      <div className={containerClasses}>
        <div className="lg:flex lg:items-start lg:justify-between">
          <div className={`${contentClasses} lg:flex-grow`}>
            {renderContent()}
          </div>
          <div className="lg:ml-8 lg:flex-shrink-0 lg:self-start">
            {renderButtons()}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      <div className={contentClasses}>
        {renderContent()}
        {renderButtons()}
      </div>
    </div>
  );
}
