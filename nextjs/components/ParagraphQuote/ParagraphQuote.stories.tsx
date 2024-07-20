import type { Meta, StoryObj } from '@storybook/react';
import ParagraphQuote from './ParagraphQuote';

const meta: Meta<typeof ParagraphQuote> = {
  title: 'Editorial/Paragraph Quote',
  component: ParagraphQuote,
  argTypes: {
    paragraph: { 
      description: 'ParagraphQuote fragment data',
      control: 'object' 
    },
  },
};

export default meta;
type Story = StoryObj<typeof ParagraphQuote>;

export const Default: Story = {
  args: {
    paragraph: {
      author: 'Author Name',
      jobTitle: 'Job Title',
      logo: {
        image: {
          url: './images/card.webp',
          alt: 'Logo Alt Text',
          width: 320,
          height: 200,
        },
      },
      quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mauris mi, aliquam',
      thumb: {
        image: {
          url: './images/card.webp',
          alt: 'Thumb Alt Text',
          width: 320,
          height: 200,
        },
      },
    }
  }
};
