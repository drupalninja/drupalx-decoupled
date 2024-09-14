'use client';

import React from 'react';
import { FragmentOf, readFragment } from 'gql.tada';
import { ParagraphCarouselFragment } from '@/graphql/fragments/paragraph';
import Carousel, { CarouselItemData } from '@/components/carousel/Carousel';
import { getImage } from '@/components/helpers/Utilities';

interface ParagraphCarouselProps {
  paragraph: FragmentOf<typeof ParagraphCarouselFragment>;
  modifier?: string;
}

export default function ParagraphCarousel({ paragraph, modifier }: ParagraphCarouselProps) {
  const { id, carouselItem } = readFragment(ParagraphCarouselFragment, paragraph);

  const carouselItems: CarouselItemData[] = carouselItem.map((item: any) => ({
    media: item.media ? getImage(item.media, 'w-full h-full object-cover', ['LARGE', 'I169LARGE2X']) : undefined,
    title: item.title,
    summary: item.summary,
  }));

  return (
    <div className={`container mx-auto px-4 ${modifier || 'my-15'}`}>
      <Carousel items={carouselItems} />
    </div>
  );
}
