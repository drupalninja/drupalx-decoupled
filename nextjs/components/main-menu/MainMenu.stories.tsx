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
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof MainMenu>;

export const Default: Story = {
  args: {
    modifier: 'bg-white shadow-md',
    linkModifier: 'text-gray-700 hover:text-blue-600',
    showLogo: true,
    siteLogo: './images/logo.svg',
    siteLogoWidth: 150,
    siteLogoHeight: 50,
    siteName: 'Site Name',
    showSiteName: false,
    ctaLinkCount: 2,
    menuItems: [
      {
        title: 'Home',
        url: '/',
        inActiveTrail: true,
      },
      {
        title: 'Products',
        url: '/products',
        isExpanded: true,
        below: [
          {
            title: 'Product Category 1',
            url: '/products/category-1',
          },
          {
            title: 'Product Category 2',
            url: '/products/category-2',
          },
          {
            title: 'Product Category 3',
            url: '/products/category-3',
          },
        ],
      },
      {
        title: 'Services',
        url: '/services',
        isExpanded: true,
        below: [
          {
            title: 'Service 1',
            url: '/services/service-1',
          },
          {
            title: 'Service 2',
            url: '/services/service-2',
          },
        ],
      },
      {
        title: 'About',
        url: '/about',
      },
      {
        title: 'Contact',
        url: '/contact',
      },
      {
        title: 'Get Started',
        url: '/get-started',
      },
    ],
  },
};
