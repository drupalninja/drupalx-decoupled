import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Sidebyside from './Sidebyside';

const meta: Meta<typeof Sidebyside> = {
  title: 'Editorial/Sidebyside',
  component: Sidebyside,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Sidebyside>;

const mockSidebyside = {
  eyebrow: 'Featured',
  layout: 'left',
  title: 'Side by Side Component',
  summary: '<p>This is a sample summary for the side-by-side component.</p>',
  link: {
    url: 'https://example.com',
    title: 'Learn More',
  },
  media: <img src="./images/card.webp" alt="Card Image" width={500} height={300} />,
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
