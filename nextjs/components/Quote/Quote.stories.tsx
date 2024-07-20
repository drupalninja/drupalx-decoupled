import type { Meta, StoryObj } from '@storybook/react';
import Quote from './Quote';
import Image from 'next/image';

const meta: Meta<typeof Quote> = {
  title: 'Editorial/Quote',
  component: Quote,
  argTypes: {
    modifierClass: { control: 'text' },
    logo: { control: 'text' },
    quote: { control: 'text' },
    image: { control: 'text' },
    name: { control: 'text' },
    job: { control: 'text' },
    layout: {
      control: { type: 'select', options: ['left', 'right'] },
    },
  }
};

export default meta;
type Story = StoryObj<typeof Quote>;

export const Default: Story = {
  args: {
    modifierClass: '',
    logo: <Image src="https://placehold.co/400x300/333333/FFF?text=Logo" alt="Logo" width={400} height={300} className="img-fluid rounded-circle" />,
    quote: 'Quisque id odio. Sed a libero. Praesent ut ligula non mi varius sagittis. Curabitur nisi.',
    image: <Image src="https://placehold.co/400x300/333333/FFF?text=Headshot" alt="Headshot" width={400} height={300} className="img-fluid rounded-circle" />,
    name: 'Jane Doe',
    job: 'Donec interdum metus et hendrerit',
    layout: 'left',
  }
};
