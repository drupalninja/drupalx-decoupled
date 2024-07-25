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
      title: 'Card 1',
      summary: { value: 'This is a summary for Card 1' },
      link: { url: '#', title: 'Read More' },
      media: { 
        image: {
          url: './images/card.webp',
          alt: 'Card 1 Image',
          width: 500,
          height: 300,
        },
      },
    },
    {
      title: 'Card 2',
      summary: { value: 'This is a summary for Card 2' },
      link: { url: '#', title: 'Learn More' },
      media: { 
        image: {
          url: './images/card.webp',
          alt: 'Card 2 Image',
          width: 500,
          height: 300,
        },
      },
    },
    {
      title: 'Card 3',
      summary: { value: 'This is a summary for Card 3' },
      link: { url: '#', title: 'Explore' },
      media: {
        image: {
          url: './images/card.webp',
          alt: 'Card 3 Image',
          width: 500,
          height: 300,
        },
      },
    },
  ],
};

export const Default: Story = {
  args: {
    paragraph: mockParagraph as any,
    modifier: '',
  },
};
