import type { Meta, StoryObj } from '@storybook/react';
import Newsletter from './Newsletter';

const meta: Meta<typeof Newsletter> = {
  title: 'Editorial/Newsletter',
  component: Newsletter,
  argTypes: {
    title: {
      control: 'text',
      description: 'Title of the newsletter',
    },
    summary: {
      control: 'object',
      description: 'Summary text of the newsletter as TextFormat',
    },
    modifier: {
      control: 'text',
      description: 'Modifier class for the newsletter container',
    },
  },
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof Newsletter>;

export const Default: Story = {
  args: {
    title: 'Sign up for our newsletter',
    summary: {
      value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      processed: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      format: 'full_html',
    },
    modifier: "container mx-auto px-8 my-2 lg:my-10",
  },
};
