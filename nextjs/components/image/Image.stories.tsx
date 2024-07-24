import type { Meta, StoryObj } from '@storybook/react';
import Image from './Image';

const meta: Meta<typeof Image> = {
  title: 'General/Image',
  component: Image,
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' }
  }
};

export default meta;
type Story = StoryObj<typeof Image>;

export const Default: Story = {
  args: {
    src: './images/card.webp',
    alt: 'Image alt text'
  }
};
