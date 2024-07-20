import type { Meta, StoryObj } from '@storybook/react';
import ParagraphMedia from './ParagraphMedia';

const meta: Meta<typeof ParagraphMedia> = {
  title: 'Editorial/Paragraph Media',
  component: ParagraphMedia,
  argTypes: {
    paragraph: { 
      description: 'ParagraphMedia fragment data',
      control: 'object' 
    },
  },
};

export default meta;
type Story = StoryObj<typeof ParagraphMedia>;

export const Default: Story = {
  args: {
    paragraph: {
      media: {
        image: {
          url: './images/card.webp',
          alt: 'Card',
          width: 800,
          height: 600,
        },
      },
    } as any
  }
};
