import type { Meta, StoryObj } from '@storybook/react';
import Breadcrumb from './Breadcrumb';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Navigation/Breadcrumb',
  component: Breadcrumb,
  argTypes: {
    breadcrumb: {
      description: 'Define the breadcrumb content',
      control: 'object',
    }
  }
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {
  args: {
    breadcrumb: [
      {
        text: 'Home',
        url: '#'
      },
      {
        text: 'Parent Page',
        url: '#'
      },
      {
        text: 'Current Page',
        url: ''
      }
    ]
  }
};
