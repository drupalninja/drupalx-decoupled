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
    links: [
      {
        title: 'Privacy Policy',
        url: '#',
        children: {
          title: 'Sub-link',
          url: '#',
        },
      } as any,
      {
        title: 'Terms of Use',
        url: '#',
        children: {
          title: 'Sub-link',
          url: '#',
        },
      },
      {
        title: 'Contact Us',
        url: '#',
        children: {
          title: 'Sub-link',
          url: '#',
        },
      },
    ],
  },
};
