import { Meta, StoryObj } from '@storybook/react';
import Popover from './Popover';

const meta: Meta<typeof Popover> = {
  title: 'Messages/Popover',
  component: Popover,
  argTypes: {
    title: { control: 'text' },
    content: { control: 'text' },
    placement: {
      control: { type: 'select', options: ['top', 'bottom', 'left', 'right'] },
    },
    trigger: {
      control: { type: 'select', options: ['click', 'hover', 'focus', 'manual'] },
    },
    buttonVariant: {
      control: { type: 'select', options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'] },
    },
    buttonText: { control: 'text' },
    buttonAttributes: { control: 'object' },
  },
};

export default meta;

type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  args: {
    title: 'Popover title',
    content: 'And here\'s some amazing content. It\'s very engaging.Right? ',
  },
};
