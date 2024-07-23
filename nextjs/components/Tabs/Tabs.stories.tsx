import type { Meta, StoryObj } from '@storybook/react';
import Tabs from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Navigation/Tabs',
  component: Tabs,
  argTypes: {
    tabItems: {
      description: 'Define the tab items',
      control: 'object',
    }
  }
};

export default meta;
export const Default: StoryObj<typeof Tabs> = {
  args: {
    tabItems: [
      {
        title: 'Active',
        url: '#',
        active: true
      },
      {
        title: 'Link',
        url: '#'
      },
      {
        title: 'Link',
        url: '#'
      },
      {
        title: 'Disabled',
        url: '#',
        disabled: true
      }
    ]
  }
};
