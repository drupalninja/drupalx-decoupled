'use client';

import { FragmentOf, readFragment } from 'gql.tada';
import { ParagraphCarouselFragment } from '@/graphql/fragments/paragraph';
import { Carousel } from 'react-bootstrap';
import { getImage } from '../helpers/Utilities';
import './ParagraphCarousel.scss';

interface ParagraphCarouselProps {
  paragraph: FragmentOf<typeof ParagraphCarouselFragment>,
  modifier?: string,
}

export default function ParagraphCarousel({ paragraph, modifier }: ParagraphCarouselProps) {
  const { id, carouselItem } = readFragment(ParagraphCarouselFragment, paragraph);

  return (
    <div className={modifier ?? 'container'}>
      <Carousel id={`carousel-${id}`} className="carousel-single">
        {carouselItem.map((item: any, index: number) => (
          <Carousel.Item key={index} className={`carousel-item ${item.active ? 'active' : ''}`}>
            {item.media && (getImage(item.media, 'img-fluid', ['LARGE', 'I169LARGE2X']))}
            <Carousel.Caption className="d-none d-md-block">
              {item.title && <h3>{item.title}</h3>}
              <p>{item.summary}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}
