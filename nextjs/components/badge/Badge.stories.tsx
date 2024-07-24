import type { Meta, StoryObj } from '@storybook/react';
import Badge from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'General/Badge',
  component: Badge,
  argTypes: {
    tag: {
      description: 'Define the badge content',
      control: 'text'
    },
    modifier: {
      description: 'Define the badge modifier',
      control: 'text'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    tag: 'New feature',
    modifier: 'text-bg-primary'
  }
};
