import type { Meta, StoryObj } from '@storybook/react';
import Quote from './Quote';
import Image from 'next/image';

const meta: Meta<typeof Quote> = {
  title: 'Editorial/Quote',
  component: Quote,
  argTypes: {
    author: {
      description: 'Author of the quote',
      control: 'text'
    },
    jobTitle: {
      description: 'Job title of the author',
      control: 'text'
    },
    logo: {
      description: 'Logo component',
      control: 'object'
    },
    quote: {
      description: 'The quote text',
      control: 'text'
    },
    thumb: {
      description: 'Thumbnail image for the author',
      control: 'object'
    },
  },
};

export default meta;
type Story = StoryObj<typeof Quote>;

const mockMedia = (
  <div className='w-1/3 mx-auto'>
    <Image
      src="./images/card.webp"
      alt="Example image"
      width={320}
      height={200}
      className="mx-auto"
    />
  </div>
);

export const Default: Story = {
  args: {
    author: 'Author Name',
    jobTitle: 'Job Title',
    logo: mockMedia,
    quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mauris mi, aliquam',
    thumb: {
      image: {
        url: "./images/card.webp",
      },
    },
  }
};
