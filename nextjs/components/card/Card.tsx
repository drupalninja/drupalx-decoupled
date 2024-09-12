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
                <StatCard
                  title={item?.title}
                  summary={item?.statSummary}
                  icon={getImage(item?.customIcon)}
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

const StatCard = ({ title, summary, icon }) => (
  <Card className="h-full">
    <CardHeader>
      {icon && (
        <div className="w-12 h-12 mb-4">
          <img src={icon.src} alt={icon.alt || ''} className="w-full h-full object-contain" />
        </div>
      )}
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-lg font-semibold">{summary}</p>
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
