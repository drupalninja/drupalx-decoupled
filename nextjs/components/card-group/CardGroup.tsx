import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export interface CardGroupProps {
  title?: string;
  cards: (StatCardProps | CustomCardProps)[];
  modifier?: string;
}

export interface StatCardProps {
  type: 'stat';
  media?: React.ReactNode;
  heading: string;
  body?: string;
  modifier?: string;
}

export interface CustomCardProps {
  type: 'custom';
  media?: React.ReactNode;
  mediaLink?: string;
  heading: { title: string; url?: string };
  tags?: string[];
  summaryText?: string;
  link?: { url: string; title: string };
}

export default function CardGroup({ title, cards, modifier }: CardGroupProps) {
  const gridCols = cards.length === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3';

  return (
    <div className={modifier ?? 'container mx-auto my-15'}>
      <div className="space-y-6 lg:space-y-8">
        {title && (
          <h2 className="text-3xl lg:text-3xl font-bold text-center mb-6 lg:mb-8">{title}</h2>
        )}
        <div className={`grid grid-cols-1 ${gridCols} gap-4 lg:gap-6`}>
          {cards.map((card, index) => (
            <div key={index} className="mb-4">
              {card.type === 'stat' ? (
                <StatCard {...card} />
              ) : (
                <CustomCard {...card} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const StatCard = ({ media, heading, body, modifier = '' }: StatCardProps) => (
  <Card className={`text-center ${modifier}`}>
    <CardContent className="pt-6">
      {media && (
        <div className="stat-icon mx-auto mb-4">
          {media}
        </div>
      )}
      <CardTitle className="mb-2">{heading}</CardTitle>
      {body && <p className="mb-0 text-gray-600">{body}</p>}
    </CardContent>
  </Card>
);

const CustomCard = ({ media, mediaLink, heading, tags = [], summaryText = '', link }: CustomCardProps) => {
  return (
    <Card className="card h-full flex flex-col">
      {mediaLink && media ? (
        <Link href={mediaLink}>
          <AspectRatio ratio={16 / 9}>
            {media}
          </AspectRatio>
        </Link>
      ) : media ? (
        <AspectRatio ratio={16 / 9}>
          {media}
        </AspectRatio>
      ) : null}
      <CardContent className="flex-grow pt-6">
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className='badge mb-2'>{tag}</Badge>
            ))}
          </div>
        )}
        <CardHeader className="p-0">
          <CardTitle className="card-title text-xl mb-3">
            {heading.url ? (
              <Link href={heading.url} className="hover:underline">
                {heading.title}
              </Link>
            ) : (
              heading.title
            )}
          </CardTitle>
        </CardHeader>
        {summaryText && <p className="text-sm text-gray-600">{summaryText}</p>}
      </CardContent>
      {link && (
        <CardFooter>
          <Button asChild variant="default">
            <Link href={link.url}>
              {link.title}
              <span className="ml-2">→</span>
            </Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
