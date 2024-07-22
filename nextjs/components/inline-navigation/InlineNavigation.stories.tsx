import type { Meta, StoryObj } from '@storybook/react';
import InlineNavigation from './InlineNavigation';

const meta: Meta<typeof InlineNavigation> = {
  title: 'Navigation/Inline Navigation',
  component: InlineNavigation,
  argTypes: {
    navItems: { control: 'object' }
  }
};

export default meta;
type Story = StoryObj<typeof InlineNavigation>;

export const Default: Story = {
  args: {
    navItems: [
      {
        text: 'Link 1',
        url: '#'
      },
      {
        text: 'Link 2',
        url: '#'
      },
      {
        text: 'Link 3',
        url: '#'
      }
    ]
  }
};
