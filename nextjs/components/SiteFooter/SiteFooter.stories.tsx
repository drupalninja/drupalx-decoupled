import type { Meta, StoryObj } from '@storybook/react';
import SiteFooter from './SiteFooter';

const meta: Meta<typeof SiteFooter> = {
  title: 'General/Site Footer',
  component: SiteFooter,
  argTypes: {
    links: {
      description: 'Define the links',
      control: 'object',
    },
    siteLogo: {
      description: 'Define the site logo',
      control: 'text',
    },
    modifier: {
      description: 'Define the modifier',
      control: 'text',
    },
    menuModifier: {
      description: 'Define the menu modifier',
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SiteFooter>;

export const Default: Story = {
  args: {
    siteLogo: './images/logo.svg',
    modifier: '',
    linkItemModifier: 'fs-5 text-white',
    links: [
      {
        title: 'Privacy Policy',
        url: '#',
      },
      {
        title: 'Terms of Use',
        url: '#',
      },
      {
        title: 'Contact Us',
        url: '#',
      },
    ],
  },
};
