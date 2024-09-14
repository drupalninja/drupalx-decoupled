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
      control: 'text',
      description: 'Summary text of the newsletter',
    },
    modifier: {
      control: 'text',
      description: 'Modifier class for the newsletter container',
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Newsletter>;

export const Default: Story = {
  args: {
    title: 'Sign up for our newsletter',
    summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    modifier: "container mx-auto px-8",
  },
};
