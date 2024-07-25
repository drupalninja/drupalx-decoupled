import type { Meta, StoryObj } from '@storybook/react';
import Alert from './Alerts';

const meta: Meta<typeof Alert> = {
  title: 'Messages/Alerts',
  component: Alert,
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  args: {
    type: 'primary',
    children: 'A simple primary alert—check it out!',
  },
};

export const Secondary: Story = {
  args: {
    type: 'secondary',
    children: 'A simple secondary alert—check it out!',
  },
};

export const Success: Story = {
  args: {
    type: 'success',
    children: 'A simple success alert—check it out!',
  },
};

export const Danger: Story = {
  args: {
    type: 'danger',
    children: 'A simple danger alert—check it out!',
  },
};

export const Warning: Story = {
  args: {
    type: 'warning',
    children: 'A simple warning alert—check it out!',
  },
};

export const Info: Story = {
  args: {
    type: 'info',
    children: 'A simple info alert—check it out!',
  },
};

export const Light: Story = {
  args: {
    type: 'light',
    children: 'A simple light alert—check it out!',
  },
};

export const Dark: Story = {
  args: {
    type: 'dark',
    children: 'A simple dark alert—check it out!',
  },
};
