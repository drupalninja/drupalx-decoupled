import ParagraphText from './ParagraphText';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ParagraphText> = {
  title: 'Editorial/Paragraph Text',
  component: ParagraphText,
  argTypes: {
    paragraph: {
      description: 'ParagraphText fragment data',
      control: 'object',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ParagraphText>;

export const Default: Story = {
  args: {
    paragraph: {
      title: 'Title Lorem Ipsum Dolor',
      body: {
        value: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mauris mi, aliquam in orci at, finibus malesuada elit. Vivamus ex ante, imperdiet nec odio ac, sollicitudin fermentum velit.</p>',
      },
      eyebrow: 'Test eyebrow',
      link: {
        url: '#',
        title: 'Read more',
      },
      link2: {
        url: '#',
        title: 'Read more',
      }
    } as any,
  }
};
