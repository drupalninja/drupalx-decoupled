import type { Meta, StoryObj } from '@storybook/react';
import { SearchBox } from './SearchBox';

const meta: Meta<typeof SearchBox> = {
  title: 'Data Entry/Search Box',
  component: SearchBox,
};

export default meta;
export const SearchBoxComponent: StoryObj<typeof SearchBox> = {
  args: {},
};
