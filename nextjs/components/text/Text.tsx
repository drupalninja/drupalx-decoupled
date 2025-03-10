import { Button } from "@/components/ui/button";
import { LinkFormat, TextFormat } from '@/lib/types';

export interface TextProps {
  title?: string;
  body?: TextFormat;
  link?: LinkFormat;
  link2?: LinkFormat;
  eyebrow?: string;
  textLayout?: 'default' | 'centered' | 'buttons-right';
  modifier?: string;
}

export default function Text({
  title,
  body,
  link,
  link2,
  eyebrow,
  textLayout = 'default',
  modifier
}: TextProps) {
  const containerClasses = `container mx-auto ${modifier || 'my-6 lg:my-25'}`;
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
        {link?.url && (
          <Button
            variant="default"
            className="mr-4"
            asChild
          >
            <a href={link.url}>{link.title || 'Read more'}</a>
          </Button>
        )}
        {link2?.url && (
          <Button
            variant="secondary"
            asChild
          >
            <a href={link2.url}>{link2.title || 'Read more'}</a>
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
      {body && body.value && (
        <div className="mt-4 text-xl text-gray-500" dangerouslySetInnerHTML={{ __html: body.value }}></div>
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
