import MainMenu from './MainMenu';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof MainMenu> = {
  title: 'Navigation/Main Navigation',
  component: MainMenu,
  argTypes: {
    menuItems: {
      description: 'Define the array of main menu items',
      control: 'object',
    },
  },
};

export default meta;
type Story = StoryObj<typeof MainMenu>;

export const Default: Story = {
  args: {
    modifier: '',
    linkModifier: '',
    siteLogo: './images/logo.svg',
    menuItems: [
      {
        title: 'Home',
        url: '#',
        inActiveTrail: true,
      },
      {
        title: 'Menu Item 1',
        url: '#',
        isExpanded: true,
        below: [
          {
            title: 'Vestibulum ac diam',
            url: '#',
          },
          {
            title: 'Mauris blandit aliquet',
            url: '#',
          },
          {
            title: 'Pellentesque in',
            url: '#',
          },
        ],
      },
      {
        title: 'Menu Item 2',
        url: '#',
        isExpanded: true,
        below: [
          {
            title: 'Vestibulum ac diam',
            url: '#',
          },
          {
            title: 'Mauris blandit aliquet',
            url: '#',
          },
        ],
      },
      {
        title: 'Menu Item 3',
        url: '#',
      },
    ],
  }
};
