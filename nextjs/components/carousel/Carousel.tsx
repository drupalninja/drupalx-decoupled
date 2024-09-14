'use client';

import React, { ReactNode } from 'react';
import { Carousel as UICarousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

export interface CarouselItemData {
  media?: ReactNode;
  title?: string;
  summary?: string;
}

interface CarouselProps {
  items: CarouselItemData[];
  className?: string;
  itemClassName?: string;
}

export default function Carousel({ items, className, itemClassName }: CarouselProps) {
  return (
    <UICarousel className={`carousel w-full ${className || ''}`}>
      <CarouselContent>
        {items.map((item, index) => (
          <CarouselItem key={index} className={`carousel-item ${itemClassName || ''}`}>
            <Card className="w-full border-none">
              <CardContent className="p-0">
                <div className="carousel-content relative aspect-[16/9] w-full">
                  {item.media && (
                    <div className="absolute inset-0">
                      {item.media}
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
    </UICarousel>
  );
}
