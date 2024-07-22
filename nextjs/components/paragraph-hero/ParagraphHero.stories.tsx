import type { Meta, StoryObj } from '@storybook/react';
import ParagraphHero from './ParagraphHero';
import { ParagraphHeroFragment } from '@/graphql/fragments/paragraph';
import { FragmentOf } from 'gql.tada';

const meta: Meta<typeof ParagraphHero> = {
  title: 'Editorial/Paragraph Hero',
  component: ParagraphHero,
  argTypes: {
    paragraph: { control: 'object' },
    modifier: { control: 'text' }
  }
};

export default meta;
type Story = StoryObj<typeof ParagraphHero>;

const mockParagraph: FragmentOf<typeof ParagraphHeroFragment> = {
  requiredMedia: {
    image: {
      url: './images/card.webp',
      alt: 'Example image',
      width: 1280,
      height: 720,
    },
  },
  heroLayout: 'image_top',
  heading: {
    value: 'Welcome to <strong>Our Website</strong>',
  },
  summary: {
    value: 'This is a brief summary of our amazing content. It can include <em>formatted text</em> as well.',
  },
  link: {
    url: 'https://example.com',
    title: 'Learn More',
  },
} as any;

export const Default: Story = {
  args: {
    paragraph: mockParagraph,
    modifier: '',
  }
};

export const ImageBottom: Story = {
  args: {
    paragraph: {
      ...mockParagraph,
      heroLayout: 'image_bottom',
    } as any,
    modifier: '',
  }
};
