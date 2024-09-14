import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Carousel, { CarouselItemData } from './Carousel';

const meta: Meta<typeof Carousel> = {
  title: 'Editorial/Carousel',
  component: Carousel,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Carousel>;

const mockItems: CarouselItemData[] = [
  {
    media: <img src="./images/card.webp" alt="Image 1" className="w-full h-full object-cover" />,
    title: 'First Slide',
    summary: 'This is the first slide',
  },
  {
    media: <img src="./images/card.webp" alt="Image 2" className="w-full h-full object-cover" />,
    title: 'Second Slide',
    summary: 'This is the second slide',
  },
  {
    media: <img src="./images/card.webp" alt="Image 3" className="w-full h-full object-cover" />,
    title: 'Third Slide',
    summary: 'This is the third slide',
  },
];

export const Default: Story = {
  args: {
    items: mockItems,
    className: 'max-w-3xl mx-auto',
    itemClassName: 'px-1',
  },
};
