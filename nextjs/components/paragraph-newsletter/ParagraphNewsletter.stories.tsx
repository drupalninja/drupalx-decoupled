import type { Meta, StoryObj } from '@storybook/react';
import ParagraphNewsletter from './ParagraphNewsletter';
import { ParagraphNewsletterFragment } from '@/graphql/fragments/paragraph';
import { FragmentOf } from 'gql.tada';

const meta: Meta<typeof ParagraphNewsletter> = {
  title: 'Editorial/Paragraph Newsletter',
  component: ParagraphNewsletter,
  argTypes: {
    modifier: {
      control: 'text',
      description: 'Modifier class for the newsletter',
    },
    paragraph: {
      description: 'FragmentOf<typeof ParagraphNewsletterFragment>',
      control: 'object',
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ParagraphNewsletter>;

export const Default: Story = {
  args: {
    paragraph: {} as any,
    modifier: "container",
  },
};
