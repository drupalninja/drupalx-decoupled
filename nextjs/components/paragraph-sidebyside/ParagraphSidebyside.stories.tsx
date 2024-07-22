import type { Meta, StoryObj } from '@storybook/react';
import ParagraphSidebyside from './ParagraphSidebyside';

const meta: Meta<typeof ParagraphSidebyside> = {
  title: 'Editorial/Paragraph Side-By-Side',
  component: ParagraphSidebyside,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ParagraphSidebyside>;

const mockParagraph = {
  eyebrow: 'Featured',
  sidebysideLayout: 'left',
  sidebysideSummary: {
    value: '<p>This is a sample summary for the side-by-side component.</p>',
  },
  sidebysideTitle: 'Side by Side Component',
  link: {
    url: 'https://example.com',
    title: 'Learn More',
  },
  media: {
    image: {
      url: './images/card.webp',
      alt: 'Card Image',
      width: 500,
      height: 300,
    },
  },
} as const;

export const Default: Story = {
  args: {
    paragraph: mockParagraph,
    modifier: '',
  } as any,
};

export const RightLayout: Story = {
  args: {
    paragraph: {
      ...mockParagraph,
      sidebysideLayout: 'right',
    } as any,
    modifier: '',
  },
};
