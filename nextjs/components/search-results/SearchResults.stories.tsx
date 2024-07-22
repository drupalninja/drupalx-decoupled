import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import SearchResults from './SearchResults';

const meta: Meta<typeof SearchResults> = {
  title: 'Content Display/Search Results',
  component: SearchResults,
  argTypes: {
    results: { control: 'object' }
  }
};

export default meta;
type Story = StoryObj<typeof SearchResults>;

export const Default: Story = {
  args: {
    results: [
      {
        title: 'What are the biggest challenges to starting a business?',
        image: "<img src='https://via.placeholder.com/640x480.png' class='img-fluid' alt='Placeholder' />",
        summary: '<p>It\'s useful to come up with a business plan to think through what you want to do for the development of the product or service, marketing, financial projections and more.</p>',
        link: 'www.url.com'
      },
      {
        title: 'What are the biggest challenges to starting a business?',
        image: "<img src='https://via.placeholder.com/640x480.png' class='img-fluid' alt='Placeholder' />",
        summary: '<p>It\'s useful to come up with a business plan to think through what you want to do for the development of the product or service, marketing, financial projections and more.</p>',
        link: 'www.url.com'
      },
      {
        title: 'What are the biggest challenges to starting a business?',
        image: "<img src='https://via.placeholder.com/640x480.png' class='img-fluid' alt='Placeholder' />",
        summary: '<p>It\'s useful to come up with a business plan to think through what you want to do for the development of the product or service, marketing, financial projections and more.</p>',
        link: 'www.url.com'
      }
    ]
  }
};
