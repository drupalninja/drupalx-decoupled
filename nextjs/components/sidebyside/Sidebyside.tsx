import React, { ReactNode } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface SidebysideProps {
  eyebrow?: string;
  layout?: string;
  title: string;
  summary?: string;
  link?: {
    url?: string;
    title?: string;
  };
  media: ReactNode;
  modifier?: string;
}

export default function Sidebyside({ eyebrow, layout, title, summary, link, media, modifier }: SidebysideProps) {
  return (
    <div className={`flex flex-col lg:flex-row items-center justify-between gap-6 ${modifier ?? 'container my-6 lg:my-15'} ${layout === 'right' ? 'lg:flex-row-reverse' : ''}`}>
      <div className="w-full lg:w-1/2">
        {media}
      </div>
      <div className="w-full lg:w-1/2 xl:w-5/12 flex flex-col gap-4">
        {eyebrow && (
          <div className="flex">
            <Badge variant="secondary" className="sidebyside-badge uppercase inline-flex">
              {eyebrow}
            </Badge>
          </div>
        )}
        <h2 className="text-3xl font-bold">{title}</h2>
        {summary && (
          <div
            className="mb-3"
            dangerouslySetInnerHTML={{ __html: summary }}
          />
        )}
        {link?.url && (
          <div className="flex">
            <Button variant="default" asChild>
              <a href={link.url}>
                {link.title ?? 'Read more'}
              </a>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
