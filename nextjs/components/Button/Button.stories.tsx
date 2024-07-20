import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

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
      description: 'The icon name to be displayed inside the button',
      control: 'text',
    },
    modifier: {
      description: 'The modifier classes for the button',
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    url: '#',
    text: 'Primary Button',
    icon: 'arrow_right_alt',
    modifier: 'btn-primary',
  }
}

export const Secondary: Story = {
  args: {
    url: '#',
    text: 'Secondary Button',
    icon: 'arrow_right_alt',
    modifier: 'btn-secondary',
  }
};

export const PrimaryOutlined: Story = {
  args: {
    url: '#',
    text: 'Primary Button',
    icon: '',
    modifier: 'btn-outline-primary',
  }
};

export const SecondaryOutlined: Story = {
  args: {
    url: '#',
    text: 'Secondary Button',
    icon: '',
    modifier: 'btn-outline-secondary',
  }
};

export const PrimarySmall: Story = {
  args: {
    url: '#',
    text: 'Primary Button Small',
    icon: '',
    modifier: 'btn-primary btn-sm',
  }
};

export const SecondarySmall: Story = {
  args: {
    url: '#',
    text: 'Secondary Button Small',
    icon: '',
    modifier: 'btn-secondary btn-sm',
  }
};
