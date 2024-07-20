'use client'

import React from 'react';
import { getImage } from '../helpers/Utilities';
import Badge from '../Badge/Badge';
import Button from '../Button/Button';
import Heading, { HeadingProps } from '../Heading/Heading';
import { Card as BootstrapCard } from 'react-bootstrap';
import './Card.scss';

export interface CardProps {
  modifier?: string;
  bodyModifier?: string;
  media?: object;
  mediaLink?: string;
  heading: HeadingProps;
  layout?: string;
  tags?: string[];
  summaryText?: string;
  link?: {
    url: string;
    title: string;
  };
  link2?: {
    url: string;
    title: string;
  };
}

const Card: React.FC<CardProps> = ({
  modifier = '',
  bodyModifier = '',
  media,
  mediaLink,
  heading,
  layout = '',
  tags = [],
  summaryText = '',
  link,
  link2,
}) => {
  return (
    <BootstrapCard className={`h-100 ${modifier}`}>
      {media && (
        <>{getImage(media)}</>
      )}
      <BootstrapCard.Body className={`mt-2 ${bodyModifier}`}>
        {tags.length > 0 && (
          <ul className="list-inline mb-2">
            {tags.map((tag, index) => (
              <li key={index} className="list-inline-item">
                <Badge tag={tag} modifier="text-bg-primary" />
              </li>
            ))}
          </ul>
        )}
        <Heading
          title={heading.title}
          level={heading.level || 2}
          url={heading.url}
          modifier={heading.modifier || 'card-title mb-3'}
        />
        <p className="card-text fs-6">{summaryText}</p>
        {(link || link2) && (
          <ul className="list-inline mb-0">
            {link && (
              <li className="list-inline-item">
                <Button
                  url={link.url}
                  text={link.title}
                  icon="arrow_right_alt"
                  modifier="btn-primary"
                />
              </li>
            )}
            {link2 && (
              <li className="list-inline-item">
                <Button
                  url={link2.url}
                  text={link2.title}
                  icon="arrow_right_alt"
                  modifier="btn-outline-primary"
                />
              </li>
            )}
          </ul>
        )}
      </BootstrapCard.Body>
    </BootstrapCard>
  );
};

export default Card;
