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
    linkModifier: '',
    showLogo: true,
    siteLogo: '/images/logo.svg',
    siteLogoWidth: 200,
    siteLogoHeight: 100,
    siteName: 'My Site',
    showSiteName: true,
    ctaLinkCount: 1,
    menuItems: [
      {
        title: 'Home',
        url: '/',
      },
      {
        title: 'About Us',
        url: '/about',
        below: [
          {
            title: 'Our Team',
            url: '/about/team',
          },
          {
            title: 'Our History',
            url: '/about/history',
          },
        ],
      },
      {
        title: 'Services',
        url: '/services',
        below: [
          {
            title: 'Consulting',
            url: '/services/consulting',
          },
          {
            title: 'Development',
            url: '/services/development',
          },
          {
            title: 'Design',
            url: '/services/design',
          },
        ],
      },
      {
        title: 'Contact',
        url: '/contact',
      },
    ],
  },
};
