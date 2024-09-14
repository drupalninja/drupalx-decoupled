import type { Meta, StoryObj } from '@storybook/react';
import Quote from './Quote';

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

export const Default: Story = {
  args: {
    author: 'Author Name',
    jobTitle: 'Job Title',
    logo: <img src="./images/logo.webp" alt="Company Logo" width={100} height={50} />,
    quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mauris mi, aliquam',
    thumb: {
      image: {
        url: './images/avatar.webp',
      },
    },
  }
};
