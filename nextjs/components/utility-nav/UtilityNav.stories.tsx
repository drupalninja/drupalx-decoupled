import type { Meta, StoryObj } from '@storybook/react';

import UtilityNav from './UtilityNav';

const meta: Meta<typeof UtilityNav> = {
  title: 'Navigation/Utility Nav',
  component: UtilityNav,
  argTypes: {
    links: {
      description: 'Define the Utility Nav links.',
      control: 'object'
    }
  }
};

export default meta;
export const Default: StoryObj<typeof UtilityNav> = {
  args: {
    links: [
      {
        url: '#',
        text: 'Link 1'
      },
      {
        url: '#',
        text: 'Link 2'
      },
      {
        url: '#',
        text: 'Link 3'
      }
    ]
  }
};
