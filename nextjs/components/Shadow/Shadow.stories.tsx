import type { Meta, StoryObj } from '@storybook/react';

import Shadow from './Shadow';

const meta: Meta<typeof Shadow> = {
  title: 'General/Shadow',
  component: Shadow,
};

export default meta;
type Story = StoryObj<typeof Shadow>;

export const Default: Story = {
  args: { variant: 'sm' }
};

export const RegularShadow: Story = {
  args: { variant: 'regular' }
};

export const LargeShadow: Story = {
  args: { variant: 'lg' }
};
