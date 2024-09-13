import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';
import { ArrowRight } from 'lucide-react';

const meta: Meta<typeof Button> = {
  title: 'General/Button',
  component: Button,
  argTypes: {
    url: {
      description: 'The URL the button links to',
      control: 'text',
    },
    text: {
      description: 'The text inside the button',
      control: 'text',
    },
    icon: {
      description: 'The icon component to be displayed inside the button',
      control: { type: 'select', options: ['ArrowRight', 'none'] },
    },
    variant: {
      description: 'The button variant',
      control: { type: 'select', options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'] },
    },
    size: {
      description: 'The button size',
      control: { type: 'select', options: ['default', 'sm', 'lg', 'icon'] },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    text: 'Default Button',
    icon: ArrowRight,
    variant: 'default',
    size: 'default',
  }
};

export const Destructive: Story = {
  args: {
    text: 'Destructive Button',
    variant: 'destructive',
  }
};

export const Outline: Story = {
  args: {
    text: 'Outline Button',
    variant: 'outline',
  }
};

export const Secondary: Story = {
  args: {
    text: 'Secondary Button',
    variant: 'secondary',
  }
};

export const Ghost: Story = {
  args: {
    text: 'Ghost Button',
    variant: 'ghost',
  }
};

export const Link: Story = {
  args: {
    text: 'Link Button',
    variant: 'link',
    url: '#',
  }
};

export const Small: Story = {
  args: {
    text: 'Small Button',
    size: 'sm',
  }
};

export const Large: Story = {
  args: {
    text: 'Large Button',
    size: 'lg',
  }
};

export const IconButton: Story = {
  args: {
    text: '',
    icon: ArrowRight,
    size: 'icon',
  }
};
