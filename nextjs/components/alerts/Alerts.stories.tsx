import type { Meta, StoryObj } from '@storybook/react';
import Alerts from './Alerts';

const meta: Meta<typeof Alerts> = {
  title: 'Messages/Alerts',
  component: Alerts,
  argTypes: {
    type: {
      control: 'select',
      options: ['default', 'destructive'],
    },
    title: { control: 'text' },
    onDismiss: { action: 'dismissed' },
  },
};

export default meta;
type Story = StoryObj<typeof Alerts>;

export const Default: Story = {
  args: {
    type: 'default',
    children: 'This is a default alert.',
  },
};

export const Destructive: Story = {
  args: {
    type: 'destructive',
    children: 'This is a destructive alert.',
  },
};

export const WithTitle: Story = {
  args: {
    type: 'default',
    title: 'Alert Title',
    children: 'This is an alert with a title.',
  },
};

export const Dismissible: Story = {
  args: {
    type: 'default',
    children: 'This is a dismissible alert.',
    onDismiss: () => console.log('Alert dismissed'),
  },
};

export const LongContent: Story = {
  args: {
    type: 'default',
    title: 'Long Content Alert',
    children: 'This alert has a longer content to demonstrate how the component handles multiple lines of text. It should wrap properly and maintain good readability.',
  },
};

export const DestructiveWithTitle: Story = {
  args: {
    type: 'destructive',
    title: 'Warning',
    children: 'This is a destructive alert with a title.',
  },
};
