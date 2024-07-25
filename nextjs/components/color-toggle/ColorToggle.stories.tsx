import type { Meta, StoryObj } from '@storybook/react';
import ColorToggle from './ColorToggle';

const meta: Meta<typeof ColorToggle> = {
  title: 'General/Color Mode Toggle',
  component: ColorToggle,
};

export default meta;
type Story = StoryObj<typeof ColorToggle>;

export const ColorToggleComponent: Story = {
  args: {},
};
