import MainMenu from './MainMenu';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof MainMenu> = {
  title: 'Navigation/Main Navigation',
  component: MainMenu,
  argTypes: {
    modifier: {
      description: 'Define the modifier class for the main menu',
      control: 'text',
    },
    linkModifier: {
      description: 'Define the modifier class for the main menu links',
      control: 'text',
    },
    showLogo: {
      description: 'Show the site logo',
      control: 'boolean',
    },
    siteLogo: {
      description: 'Define the path to the site logo',
      control: 'text',
    },
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
    showLogo: true,
    siteLogo: '/images/logo.svg',
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
