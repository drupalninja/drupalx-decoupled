import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Hero from './Hero';
import Image from 'next/image';

const meta: Meta<typeof Hero> = {
  title: 'Editorial/Hero',
  component: Hero,
  argTypes: {
    heroLayout: { control: 'select', options: ['image_top', 'image_bottom', 'image_bottom_split'] },
    media: { control: 'object' },
    heading: { control: 'object' },
    summary: { control: 'object' },
    link: { control: 'object' },
    link2: { control: 'object' },
    modifier: { control: 'text' },
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Hero>;

const mockMedia = (
  <Image
    src="./images/card.webp"
    alt="Example image"
    width={1280}
    height={720}
    className="object-cover w-full h-full max-w-5xl"
  />
);

export const Default: Story = {
  args: {
    heroLayout: 'image_top',
    media: mockMedia,
    heading: {
      processed: 'Welcome to <strong>Our Website</strong>',
      value: 'Welcome to Our Website',
      format: 'full_html',
    },
    summary: {
      processed: 'This is a brief summary of our amazing content. It can include <em>formatted text</em> as well.',
      value: 'This is a brief summary of our amazing content. It can include formatted text as well.',
      format: 'full_html',
    },
    link: {
      url: 'https://example.com',
      title: 'Learn More',
    },
    link2: {
      url: 'https://example.com',
      title: 'Get Started',
    },
    modifier: 'container mx-auto my-2 lg:my-10',
  },
};

export const ImageBottom: Story = {
  args: {
    ...Default.args,
    heroLayout: 'image_bottom',
  },
};

export const ImageBottomSplit: Story = {
  args: {
    ...Default.args,
    heroLayout: 'image_bottom_split',
    heading: {
      processed: 'Empower Your Content with DrupalX Today',
      value: 'Empower Your Content with DrupalX Today',
      format: 'full_html',
    },
    summary: {
      processed: 'Discover the power of a decoupled CMS that adapts to your needs. With DrupalX, you can create, manage, and scale your content effortlessly.',
      value: 'Discover the power of a decoupled CMS that adapts to your needs. With DrupalX, you can create, manage, and scale your content effortlessly.',
      format: 'full_html',
    },
  },
};
