import type { Meta, StoryObj } from '@storybook/react';
import ParagraphCardGroup from './ParagraphCardGroup';

const meta: Meta<typeof ParagraphCardGroup> = {
  title: 'Editorial/Paragraph Card Group',
  component: ParagraphCardGroup,
  argTypes: {
    modifier: {
      control: 'text',
      description: 'Modifier class for the card group',
    },
    paragraph: {
      description: 'FragmentOf<typeof ParagraphCardGroupFragment>',
      control: 'object',
    },
  },
};

export default meta;

type Story = StoryObj<typeof ParagraphCardGroup>;

const mockParagraph = {
  title: 'Featured Cards',
  card: [
    {
      __typename: 'ParagraphCard',
      title: 'Interesting Card',
      summary: 'This is a very interesting card with some fascinating content.',
      link: { url: 'https://example.com', title: 'Learn More' },
      media: { url: 'https://example.com/image.jpg' },
      tags: ['Technology', 'Innovation'],
    },
    {
      __typename: 'ParagraphCard',
      title: 'Another Card',
      summary: 'Here\'s another card with different content.',
      link: { url: 'https://example.com/another', title: 'Explore' },
      media: { url: 'https://example.com/another-image.jpg' },
      tags: ['Research', 'Development'],
    },
    {
      __typename: 'ParagraphCard',
      title: 'Third Card',
      summary: 'A third card to showcase multiple items.',
      link: { url: 'https://example.com/third', title: 'Discover' },
      media: { url: 'https://example.com/third-image.jpg' },
      tags: ['Design', 'User Experience'],
    },
  ],
};

export const Default: Story = {
  args: {
    paragraph: mockParagraph as any,
  },
};

export const SingleCard: Story = {
  args: {
    paragraph: { ...mockParagraph, card: [mockParagraph.card[0]] },
  },
};

export const TwoCards: Story = {
  args: {
    paragraph: { ...mockParagraph, card: mockParagraph.card.slice(0, 2) },
  },
};
