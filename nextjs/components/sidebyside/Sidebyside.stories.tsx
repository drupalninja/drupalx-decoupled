import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Sidebyside from './Sidebyside';
import Image from 'next/image';

const meta: Meta<typeof Sidebyside> = {
  title: 'Editorial/Side-by-side',
  component: Sidebyside,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Sidebyside>;

const mockMedia = (
  <Image
    src="./images/card.webp"
    alt="Example image"
    width={1280}
    height={720}
  />
);

const mockSidebyside = {
  eyebrow: 'Featured',
  layout: 'left',
  title: 'Side by Side Component',
  summary: '<p>This is a sample summary for the side-by-side component.</p>',
  link: {
    url: 'https://example.com',
    title: 'Learn More',
  },
  media: mockMedia,
} as const;

export const Default: Story = {
  args: {
    ...mockSidebyside,
    modifier: '',
  },
};

export const RightLayout: Story = {
  args: {
    ...mockSidebyside,
    layout: 'right',
    modifier: '',
  },
};
