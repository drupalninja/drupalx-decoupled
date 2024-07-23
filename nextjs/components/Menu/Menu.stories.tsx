import type { Meta, StoryObj } from '@storybook/react';
import Menu from './Menu';

const meta: Meta<typeof Menu> = {
  title: 'Navigation/Menu',
  component: Menu,
  argTypes: {
    menuItems: {
      description: 'Define the links',
      control: 'object',
    },
    attributes: {
      description: 'Define the attributes',
      control: 'object',
    },
    modifier: {
      description: 'Define the modifier',
      control: 'text',
    },
    itemModifier: {
      description: 'Define the list item modifier',
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Menu>;

export const Default: Story = {
  args: {
    menuItems: [
      {
        url: '#',
        title: 'Link 1',
      },
      {
        url: '#',
        title: 'Link 2',
      },
      {
        url: '#',
        title: 'Link 3',
      },
    ],
    modifier: '',
    itemModifier: '',
  },
};
