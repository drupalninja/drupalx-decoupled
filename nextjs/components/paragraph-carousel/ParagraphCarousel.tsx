'use client';

import React from 'react';
import { FragmentOf, readFragment } from 'gql.tada';
import { ParagraphCarouselFragment } from '@/graphql/fragments/paragraph';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { getImage } from '../helpers/Utilities';

interface ParagraphCarouselProps {
  paragraph: FragmentOf<typeof ParagraphCarouselFragment>,
  modifier?: string,
}

export default function ParagraphCarousel({ paragraph, modifier }: ParagraphCarouselProps) {
  const { id, carouselItem } = readFragment(ParagraphCarouselFragment, paragraph);

  return (
    <div className={`container mx-auto px-4 ${modifier || 'my-15'}`}>
      <Carousel className="carousel w-full">
        <CarouselContent>
          {carouselItem.map((item: any, index: number) => (
            <CarouselItem key={index} className='carousel-item'>
              <Card className="w-full border-none">
                <CardContent className="p-0">
                  <div className="carousel-content relative aspect-[16/9] w-full">
                    {item.media && (
                      <div className="absolute inset-0">
                        {getImage(item.media, 'w-full h-full object-cover', ['LARGE', 'I169LARGE2X'])}
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 md:p-6">
                      {item.title && <h3 className="text-xl md:text-3xl font-semibold mb-2">{item.title}</h3>}
                      <p className="text-sm md:text-lg">{item.summary}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="carousel-prev left-2 md:left-4" />
        <CarouselNext className="carousel-next right-2 md:right-4" />
      </Carousel>
    </div>
  );
}
