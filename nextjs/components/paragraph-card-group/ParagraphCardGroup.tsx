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

  const getColumnClass = (totalItems: number) => {
    if (totalItems === 2) {
      return 'sm:w-1/2 lg:w-1/2';
    } else if (totalItems === 1) {
      return 'w-full';
    } else {
      return 'sm:w-1/2 lg:w-1/3';
    }
  };

  return (
    <div className={modifier ?? 'container mx-auto mb-8 lg:mb-44 mt-24 lg:mt-60'}>
      <div className="space-y-6 lg:space-y-8">
        {title && (
          <h2 className="text-2xl lg:text-3xl font-bold text-center mb-6 lg:mb-8">{title}</h2>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {card.map((item: any, index: number) => (
            <div key={index} className={`${getColumnClass(card.length)} mb-4`}>
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
                    level: 3,
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

const Stat = ({ media, heading, body, modifier = '' }) => (
  <Card className={`text-center ${modifier}`}>
    <CardContent className="pt-6">
      {media && (
        <div className="stat-icon mx-auto mb-4">
          <img src={media.src} alt={media.alt || ''} className="w-16 h-16 object-contain mx-auto" />
        </div>
      )}
      <CardTitle as="h3" className="mb-2">{heading}</CardTitle>
      {body && <p className="mb-0 text-gray-600">{body}</p>}
    </CardContent>
  </Card>
);

const CustomCard = ({ media, mediaLink, heading, tags = [], summaryText = '', link }) => {
  return (
    <Card className="h-full flex flex-col">
      {mediaLink && media ? (
        <Link href={mediaLink}>
          <AspectRatio ratio={16 / 9}>
            <img src={media.url} alt={media.alt || ''} className="object-cover w-full h-full" />
          </AspectRatio>
        </Link>
      ) : media ? (
        <AspectRatio ratio={16 / 9}>
          <img src={media.url} alt={media.alt || ''} className="object-cover w-full h-full" />
        </AspectRatio>
      ) : null}
      <CardContent className="flex-grow pt-6">
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag, index) => (
              <Badge key={index} variant="secondary">{tag}</Badge>
            ))}
          </div>
        )}
        <CardHeader className="p-0">
          <CardTitle className="mb-3">
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
