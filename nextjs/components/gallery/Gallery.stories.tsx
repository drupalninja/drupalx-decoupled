'use client'

import { Meta, StoryObj } from '@storybook/react';
import Gallery from './Gallery';

const meta: Meta<typeof Gallery> = {
  title: 'Editorial/Gallery',
  component: Gallery,
  argTypes: {
    mediaItems: {
      description: 'The media items for the gallery',
      control: 'object',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Gallery>;

export const Default: Story = {
  args: {
    mediaItems: [
      {
        id: 'exampleGallery1',
        image: {
          url: './images/card.webp',
          alt: 'Gallery 1',
          width: 500,
          height: 300,
        },
      },
      {
        id: 'exampleGallery2',
        image: {
          url: './images/card.webp',
          alt: 'Gallery 2',
          width: 500,
          height: 300,
        },
      },
      {
        id: 'exampleGallery3',
        image: {
          url: './images/card.webp',
          alt: 'Gallery 3',
          width: 500,
          height: 300,
        },
      },
      {
        id: 'exampleGallery4',
        image: {
          url: './images/card.webp',
          alt: 'Gallery 4',
          width: 500,
          height: 300,
        },
      },
    ],
  },
};
