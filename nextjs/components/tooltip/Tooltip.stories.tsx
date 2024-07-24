import type { Meta, StoryObj } from '@storybook/react';
import Tooltip from './Tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'Messages/Tooltip',
  component: Tooltip,
  argTypes: {
    title: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    title: 'Default tooltip',
    children: 'inline links',
  },
};
