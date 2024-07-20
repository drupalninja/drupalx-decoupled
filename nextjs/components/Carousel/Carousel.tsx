import React from 'react';
import { Carousel } from 'react-bootstrap';
import './Carousel.scss';

interface CarouselItemProps {
  active: boolean;
  image: string;
  title: string;
  caption: string;
  id: string;
}

interface CarouselProps {
  id: string;
  list: CarouselItemProps[];
}

const CarouselComponent: React.FC<CarouselProps> = ({ id, list }) => {
  return (
    <Carousel id={`carousel-${id}`} className="carousel-single">
      {list.map((item, index) => (
        <Carousel.Item key={index} className={`carousel-item ${item.active ? 'active' : ''}`}>
          {item.image && <div dangerouslySetInnerHTML={{ __html: item.image }} />}
          <Carousel.Caption className="d-none d-md-block">
            {item.title && <h3>{item.title}</h3>}
            <p>{item.caption}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CarouselComponent;
