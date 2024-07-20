import type { Meta, StoryObj } from '@storybook/react';
import Logo from './Logo';

const meta: Meta<typeof Logo> = {
  title: 'General/Logo',
  component: Logo,
  argTypes: {
    modifier: {
      description: 'Define the modifier',
      control: 'text',
    },
    siteLogo: {
      description: 'Define the site logo',
      control: 'text',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Logo>;

export const Default: Story = {
  args: {
    modifier: 'col-3',
    siteLogo: './images/logo.svg',
  }
};
