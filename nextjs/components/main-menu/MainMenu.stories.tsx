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
    siteLogoWidth: {
      description: 'Define the width of the site logo',
      control: { type: 'number' },
    },
    siteLogoHeight: {
      description: 'Define the height of the site logo',
      control: { type: 'number' },
    },
    siteName: {
      description: 'Define the site name to display',
      control: 'text',
    },
    showSiteName: {
      description: 'Show the site name',
      control: 'boolean',
    },
    ctaLinkCount: {
      description: 'Number of links to display as Call To Action (CTA) links',
      control: { type: 'number' },
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
    linkModifier: 'text-dark',
    showLogo: true,
    siteLogo: './images/logo.svg',
    siteLogoWidth: 200,
    siteLogoHeight: 100,
    siteName: 'Site Name',
    showSiteName: false,
    ctaLinkCount: 2,
    menuItems: [
      {
        title: 'Home',
        url: '#',
        inActiveTrail: true
      },
      {
        title: 'Menu Item 1',
        url: '#',
        isExpanded: true,
        below: [
          {
            title: 'Vestibulum ac diam',
            url: '#'
          },
          {
            title: 'Mauris blandit aliquet',
            url: '#'
          },
          {
            title: 'Pellentesque in',
            url: '#'
          }
        ]
      },
      {
        title: 'Menu Item 2',
        url: '#',
        isExpanded: true,
        below: [
          {
            title: 'Vestibulum ac diam',
            url: '#'
          },
          {
            title: 'Mauris blandit aliquet',
            url: '#'
          }
        ]
      },
      {
        title: 'Menu Item 3',
        url: '#'
      },
      {
        title: 'CTA 1',
        url: '#'
      },
      {
        title: 'CTA 2',
        url: '#'
      }
    ],
  },
};
