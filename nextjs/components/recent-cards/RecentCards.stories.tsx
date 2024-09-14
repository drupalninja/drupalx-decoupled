import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import RecentCards from './RecentCards';

const meta: Meta<typeof RecentCards> = {
  title: 'General/Recent Cards',
  component: RecentCards,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RecentCards>;

const sampleResults = [
  {
    id: '1',
    path: '/article/1',
    title: 'First Article',
    summary: 'This is a summary of the first article.',
    media: <img src="/api/placeholder/400/225" alt="First Article" />,
  },
  {
    id: '2',
    path: '/article/2',
    title: 'Second Article',
    summary: 'This is a summary of the second article.',
    media: <img src="/api/placeholder/400/225" alt="Second Article" />,
  },
  {
    id: '3',
    path: '/article/3',
    title: 'Third Article',
    summary: 'This is a summary of the third article.',
    media: <img src="/api/placeholder/400/225" alt="Third Article" />,
  },
];

export const Default: Story = {
  args: {
    results: sampleResults,
  },
};

export const SingleCard: Story = {
  args: {
    results: [sampleResults[0]],
  },
};

export const ManyCards: Story = {
  args: {
    results: [
      ...sampleResults,
      ...sampleResults.map(item => ({ ...item, id: `${item.id}-copy` })),
    ],
  },
};

export const NoCards: Story = {
  args: {
    results: [],
  },
};
