import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Hero from './Hero';
import Image from 'next/image';

const meta: Meta<typeof Hero> = {
  title: 'Editorial/Hero',
  component: Hero,
  argTypes: {
    heroLayout: { control: 'select', options: ['image_top', 'image_bottom'] },
    media: { control: 'object' },
    heading: { control: 'text' },
    summary: { control: 'text' },
    link: { control: 'object' },
    modifier: { control: 'text' }
  }
};

export default meta;
type Story = StoryObj<typeof Hero>;

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
    heroLayout: 'image_top',
    media: mockMedia,
    heading: 'Welcome to <strong>Our Website</strong>',
    summary: 'This is a brief summary of our amazing content. It can include <em>formatted text</em> as well.',
    link: {
      url: 'https://example.com',
      title: 'Learn More',
    },
    modifier: 'max-w-4xl',
  }
};

export const ImageBottom: Story = {
  args: {
    ...Default.args,
    heroLayout: 'image_bottom',
  }
};