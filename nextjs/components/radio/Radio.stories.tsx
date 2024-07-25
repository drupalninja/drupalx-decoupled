import type { Meta, StoryObj } from '@storybook/react';
import Radio from './Radio';

const meta: Meta<typeof Radio> = {
  title: 'Data Entry/Radio',
  component: Radio,
};

export default meta;
export const Default: StoryObj<typeof Radio> = {
  args: {
    name: 'flexRadioDefault',
    id: 'flexRadioDefault1',
    label: 'Default radio',
  },
};

export const Checked: StoryObj<typeof Radio> = {
  args: {
    name: 'flexRadioDefault',
    id: 'flexRadioDefault2',
    label: 'Default checked radio',
    checked: true,
  },
};
