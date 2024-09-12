import React from 'react';
import { FragmentOf, readFragment } from 'gql.tada';
import { ParagraphCardGroupFragment } from '@/graphql/fragments/paragraph';
import Link from 'next/link';
import { getImage } from '../helpers/Utilities';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ParagraphCardGroupProps {
  paragraph: FragmentOf<typeof ParagraphCardGroupFragment>,
  modifier?: string,
}

export default function ParagraphCardGroup({ paragraph, modifier }: ParagraphCardGroupProps) {
  const { title, card } = readFragment(ParagraphCardGroupFragment, paragraph);

  // Determine the grid columns based on the number of cards
  const gridCols = card.length === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3';

  return (
    <div className={modifier ?? 'container mx-auto my-15'}>
      <div className="space-y-6 lg:space-y-8">
        {title && (
          <h2 className="text-3xl lg:text-3xl font-bold text-center mb-6 lg:mb-8">{title}</h2>
        )}
        <div className={`grid grid-cols-1 ${gridCols} gap-4 lg:gap-6`}>
          {card.map((item: any, index: number) => (
            <div key={index} className={`mb-4`}>
              {item.__typename === 'ParagraphStatsItem' ? (
                <Stat
                  media={getImage(item?.customIcon)}
                  heading={item?.title}
                  body={item?.statSummary}
                  modifier="stat-group-item"
                />
              ) : (
                <CustomCard
                  media={item?.media}
                  mediaLink={item?.link?.url}
                  heading={{
                    title: item?.title,
                    url: item?.link?.url,
                  }}
                  tags={item?.tags}
                  summaryText={item?.summary}
                  link={item?.link}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const Stat = ({ media, heading, body, modifier = '' }: {
  media?: any,
  heading: string,
  body?: string,
  modifier?: string
}) => (
  <Card className={`text-center ${modifier}`}>
    <CardContent className="pt-6">
      {media && (
        <div className="stat-icon mx-auto mb-4">
          {getImage(media, '"w-16 h-16 object-contain mx-auto')}
        </div>
      )}
      <CardTitle className="mb-2">{heading}</CardTitle>
      {body && <p className="mb-0 text-gray-600">{body}</p>}
    </CardContent>
  </Card >
);

const CustomCard = ({ media, mediaLink, heading, tags = [], summaryText = '', link }: {
  media?: any;
  mediaLink?: string;
  heading: { title: string; url?: string };
  tags?: string[];
  summaryText?: string;
  link?: { url: string; title: string };
}) => {
  return (
    <Card className="h-full flex flex-col">
      {mediaLink && media ? (
        <Link href={mediaLink}>
          <AspectRatio ratio={16 / 9}>
            {getImage(media, 'object-cover w-full h-full')}
          </AspectRatio>
        </Link>
      ) : media ? (
        <AspectRatio ratio={16 / 9}>
          {getImage(media, 'object-cover w-full h-full')}
        </AspectRatio>
      ) : null}
      <CardContent className="flex-grow pt-6">
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className='mb-2'>{tag}</Badge>
            ))}
          </div>
        )}
        <CardHeader className="p-0">
          <CardTitle className="text-xl mb-3">
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
