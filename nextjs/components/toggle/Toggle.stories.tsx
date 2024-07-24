import type { Meta, StoryObj } from '@storybook/react';
import Toggle from './Toggle';

const meta: Meta<typeof Toggle> = {
  title: 'Data Entry/Toggle',
  component: Toggle,
};

export default meta;
export const Default: StoryObj<typeof Toggle> = {
  args: {
    label: 'Default switch checkbox input',
  },
};

export const Checked: StoryObj<typeof Toggle> = {
  args: {
    defaultChecked: true,
    label: 'Checked switch checkbox input',
  },
};

export const Disabled: StoryObj<typeof Toggle> = {
  args: {
    disabled: true,
    label: 'Disabled switch checkbox input',
  },
};

export const DisabledChecked: StoryObj<typeof Toggle> = {
  args: {
    defaultChecked: true,
    disabled: true,
    label: 'Disabled checked switch checkbox input',
  },
};
