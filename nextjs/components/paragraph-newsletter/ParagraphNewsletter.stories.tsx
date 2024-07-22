import type { Meta, StoryObj } from '@storybook/react';
import ParagraphNewsletter from './ParagraphNewsletter';
import { ParagraphNewsletterFragment } from '@/graphql/fragments/paragraph';
import { FragmentOf } from 'gql.tada';

const meta: Meta<typeof ParagraphNewsletter> = {
  title: 'Editorial/Paragraph Newsletter',
  component: ParagraphNewsletter,
  argTypes: {
    modifier: {
      control: {
        type: 'text',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ParagraphNewsletter>;

const mockParagraph: FragmentOf<typeof ParagraphNewsletterFragment> = {
  // Add mock data here based on your ParagraphNewsletterFragment structure
};

export const Default: Story = {
  args: {
    paragraph: mockParagraph,
    modifier: "container",
  },
};
