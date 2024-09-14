import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Carousel, { CarouselItemData } from './Carousel';
import Image from 'next/image';

const meta: Meta<typeof Carousel> = {
  title: 'Editorial/Carousel',
  component: Carousel,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Carousel>;

const mockMedia = (
  <Image
    src="./images/card.webp"
    alt="Example image"
    width={1280}
    height={720}
  />
);

const mockItems: CarouselItemData[] = [
  {
    media: mockMedia,
    title: 'First Slide',
    summary: 'This is the first slide',
  },
  {
    media: mockMedia,
    title: 'Second Slide',
    summary: 'This is the second slide',
  },
  {
    media: mockMedia,
    title: 'Third Slide',
    summary: 'This is the third slide',
  },
];

export const Default: Story = {
  args: {
    items: mockItems,
    className: 'max-w-4xl',
    itemClassName: '',
  },
};
