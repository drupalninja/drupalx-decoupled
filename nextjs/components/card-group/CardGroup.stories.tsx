import type { Meta, StoryObj } from '@storybook/react';
import CardGroup from './CardGroup';

const meta: Meta<typeof CardGroup> = {
  title: 'Editorial/Card Group',
  component: CardGroup,
  argTypes: {
    title: {
      control: 'text',
      description: 'Title for the card group',
    },
    cards: {
      control: 'object',
      description: 'Array of card objects (StatCardProps | CustomCardProps)[]',
    },
    modifier: {
      control: 'text',
      description: 'Modifier class for the card group',
    },
  },
};

export default meta;

type Story = StoryObj<typeof CardGroup>;

const mockCards = [
  {
    type: 'custom',
    heading: { title: 'Interesting Card', url: 'https://example.com' },
    summaryText: 'This is a very interesting card with some fascinating content.',
    link: { url: 'https://example.com', title: 'Learn More' },
    media: <img src="./images/card.webp" alt="test image" />,
    mediaLink: 'https://example.com',
    tags: ['Technology', 'Innovation'],
  },
  {
    type: 'custom',
    heading: { title: 'Another Card', url: 'https://example.com/another' },
    summaryText: 'Here\'s another card with different content.',
    link: { url: 'https://example.com/another', title: 'Explore' },
    media: <img src="./images/card.webp" alt="test image" />,
    tags: ['Research', 'Development'],
  },
  {
    type: 'stat',
    heading: 'Important Statistic',
    body: 'A significant number or fact',
    media: <svg>...</svg>, // Replace with actual SVG content
  },
];

export const Default: Story = {
  args: {
    title: 'Featured Cards',
    cards: mockCards as any,
  },
};

export const SingleCard: Story = {
  args: {
    title: 'Single Card Example',
    cards: [mockCards[0] as any],
  },
};

export const TwoCards: Story = {
  args: {
    title: 'Two Cards Example',
    cards: mockCards.slice(0, 2) as any,
  },
};

export const StatCardsOnly: Story = {
  args: {
    title: 'Stat Cards',
    cards: [
      {
        type: 'stat',
        heading: 'Statistic 1',
        body: 'Description of statistic 1',
        media: <svg>...</svg>, // Replace with actual SVG content
      },
      {
        type: 'stat',
        heading: 'Statistic 2',
        body: 'Description of statistic 2',
        media: <svg>...</svg>, // Replace with actual SVG content
      },
    ],
  },
};
