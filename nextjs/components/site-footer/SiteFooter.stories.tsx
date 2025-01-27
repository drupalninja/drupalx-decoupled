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
  },
};

export default meta;
type Story = StoryObj<typeof SiteFooter>;

export const Default: Story = {
  args: {
    siteLogo: '/images/logo.svg',
    siteLogoWidth: 200,
    siteLogoHeight: 34,
    siteName: 'DrupalX',
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
