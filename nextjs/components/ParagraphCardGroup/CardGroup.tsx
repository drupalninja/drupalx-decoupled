import React from 'react';
import Card, { CardProps } from '../Card/Card';
import './CardGroup.scss';

interface CardGroupProps {
  sectionTitle?: string;
  cardItems: CardProps[];
}

const CardGroup: React.FC<CardGroupProps> = ({ sectionTitle, cardItems }) => {
  return (
    <div className="card-group row">
      {sectionTitle && (
        <h2 className="card-group-heading mb-4 mb-lg-6 text-center">{sectionTitle}</h2>
      )}
      {cardItems.map((item, index) => (
        <div key={index} className="col-sm-6 col-lg-4 mb-4">
          <Card {...item} />
        </div>
      ))}
    </div>
  );
};

export default CardGroup;
