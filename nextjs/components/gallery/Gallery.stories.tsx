'use client'

import { Meta, StoryObj } from '@storybook/react';
import Gallery from './Gallery';
import Image from 'next/image';

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

const mockMedia = (
  <Image
    src="./images/card.webp"
    alt="Example image"
    width={1280}
    height={720}
  />
);

export const Default: Story = {
  args: {
    title: 'Gallery Title',
    summary: 'This is a sample summary for the gallery.',
    mediaItems: [
      mockMedia,
      mockMedia,
      mockMedia,
      mockMedia,
    ],
  },
};
