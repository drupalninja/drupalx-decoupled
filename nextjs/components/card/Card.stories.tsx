import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Card from './Card';
import Image from 'next/image';

const meta: Meta<typeof Card> = {
  title: 'General/Single Card',
  component: Card,
  argTypes: {
    heading: {
      name: 'Heading',
      description: 'Heading of the card',
      control: 'object',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const SingleCard: Story = {
  args: {
    modifier: 'col-6',
    bodyModifier: '',
    media: (
      <Image src="/images/card.webp" alt="test image" className="card-img-top" width={500} height={300} />
    ),
    mediaLink: '#',
    heading: {
      title: 'Phasellus auctor, turpis',
      level: 2,
      url: '#',
      modifier: 'card-title mb-3',
    },
    layout: '',
    tags: ['New feature', 'Announcement'],
    summaryText:
      'This copy is optional, if nothing is entered nothing will display. Facit nulla in vulputate vulputate aliquam. Commodo esse habent tation nam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed orci lacus.',
    link: {
      url: '#',
      text: 'Link 1',
    },
    link2: {
      url: '#',
      text: 'Link 2',
    },
  },
};

export const SingleCardNoTags: Story = {
  args: {
    modifier: 'col-6',
    bodyModifier: '',
    media: (
      <Image src="/images/card.webp" alt="test image" className="card-img-top" width={500} height={300} />
    ),
    mediaLink: '#',
    heading: {
      title: 'Phasellus auctor, turpis',
      level: 2,
      url: '#',
      modifier: 'card-title mb-3',
    },
    layout: '',
    summaryText:
      'This copy is optional, if nothing is entered nothing will display. Facit nulla in vulputate vulputate aliquam. Commodo esse habent tation nam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed orci lacus.',
    link: {
      url: '#',
      text: 'Link 1',
    },
    link2: {
      url: '#',
      text: 'Link 2',
    },
  },
};
