import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import FieldLabel, { FieldLabelProps } from './FieldLabel';

const meta: Meta<typeof FieldLabel> = {
  title: 'Data Entry/Field Label',
  component: FieldLabel,
};

export default meta;
type Story = StoryObj<typeof FieldLabel>;

export const Default: Story = {
  args: {
    label: 'Valid input',
    value: 'test@example.com',
  },
};

export const FieldLabelInvalid: Story = {
  args: {
    label: 'Invalid input',
    isInvalid: true,
    value: 'invalid@example',
  },
};
