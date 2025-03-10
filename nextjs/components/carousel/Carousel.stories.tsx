import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Carousel, { CarouselItemData } from './Carousel';
import Image from 'next/image';

const meta: Meta<typeof Carousel> = {
  title: 'Editorial/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Carousel>;

const mockMedia = (
  <Image
    src="./images/card.webp"
    alt="Example image"
    width={1280}
    height={720}
    className="object-cover w-full h-full"
  />
);

const mockItems: CarouselItemData[] = [
  {
    id: 'slide-1',
    media: mockMedia,
    title: 'First Slide',
    summary: 'This is the first slide with some additional content to demonstrate how text wraps in the overlay.',
  },
  {
    id: 'slide-2',
    media: mockMedia,
    title: 'Second Slide',
    summary: 'This is the second slide with a longer description to show how the text container adapts to different content lengths.',
  },
  {
    id: 'slide-3',
    media: mockMedia,
    title: 'Third Slide',
    summary: 'This is the third slide with some additional descriptive text to showcase the carousel functionality.',
  },
];

export const Default: Story = {
  args: {
    items: mockItems,
    className: 'max-w-6xl',
    itemClassName: 'md:basis-4/5',
    containerClassName: 'my-2 lg:my-10',
  },
};
