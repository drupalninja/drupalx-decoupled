import type { Meta, StoryObj } from '@storybook/react';
import CardGroup from './CardGroup';
import Image from 'next/image';

const meta: Meta<typeof CardGroup> = {
  title: 'Editorial/Card Group',
  component: CardGroup,
  argTypes: {
    sectionTitle: {
      description: 'The title of the card list component',
      control: 'text'
    },
    cardItems: {
      description: 'Array of the card list item content',
      control: 'object',
    }
  }
};

export default meta;
type Story = StoryObj<typeof CardGroup>;

export const Default: Story = {
  args: {
    sectionTitle: 'Latest Articles',
    cardItems: [
      {
        modifier: '',
        media: (
          <Image src="/images/card.webp" alt="test image" className="card-img-top" width={500} height={300} />
        ),
        heading: {
          title: 'Phasellus auctor, turpis',
          level: 2,
          url: '#',
          modifier: 'card-title mb-4'
        },
        tags: ['New feature', 'Announcement'],
        summaryText:
          'This copy is optional, if nothing is entered nothing will display. Facit nulla in vulputate vulputate aliquam. Commodo esse habent tation nam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed orci lacus.',
        link: {
          url: '#',
          text: 'Link 1'
        },
        link2: {
          url: '#',
          text: 'Link 2'
        }
      },
      {
        modifier: '',
        media: (
          <Image src="/images/card.webp" alt="test image" className="card-img-top" width={500} height={300} />
        ),
        heading: {
          title: 'Vestibulum ante ipsum primis',
          level: 2,
          url: '#',
          modifier: 'card-title mb-4'
        },
        tags: ['New feature', 'Announcement'],
        summaryText:
          'This copy is optional, if nothing is entered nothing will display. Facit nulla in vulputate vulputate aliquam. Commodo esse habent tation nam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed orci lacus.',
        link: {
          url: '#',
          text: 'Link 1'
        },
        link2: {
          url: '#',
          text: 'Link 2'
        }
      },
      {
        modifier: '',
        media: (
          <Image src="/images/card.webp" alt="test image" className="card-img-top" width={500} height={300} />
        ),
        heading: {
          title: 'Donec pede justo, fringilla vel',
          level: 2,
          url: '#',
          modifier: 'card-title mb-4'
        },
        tags: ['New feature', 'Announcement'],
        summaryText:
          'This copy is optional, if nothing is entered nothing will display. Facit nulla in vulputate vulputate aliquam. Commodo esse habent tation nam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed orci lacus.',
        link: {
          url: '#',
          text: 'Link 1'
        },
        link2: {
          url: '#',
          text: 'Link 2'
        }
      },
    ]
  }
};
