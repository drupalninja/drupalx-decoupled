import type { Meta, StoryObj } from '@storybook/react';
import ParagraphCarousel from './ParagraphCarousel';

const meta: Meta<typeof ParagraphCarousel> = {
  title: 'Editorial/Paragraph Carousel',
  component: ParagraphCarousel,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ParagraphCarousel>;

const mockParagraph = {
  id: '1',
  carouselItem: [
    {
      active: true,
      media: {
        image: {
          url: './images/card.webp',
          alt: 'Image 1',
          width: 1920,
          height: 1280,
        },
      },
      title: 'First Slide',
      summary: 'This is the first slide',
    },
    {
      active: false,
      media: {
        image: {
          url: './images/card.webp',
          alt: 'Image 2',
          width: 1920,
          height: 1280,
        },
      },
      title: 'Second Slide',
      summary: 'This is the second slide',
    },
    {
      active: false,
      media: {
        image: {
          url: './images/card.webp',
          alt: 'Image 3',
          width: 1920,
          height: 1280,
        },
      },
      title: 'Third Slide',
      summary: 'This is the third slide',
    },
  ],
};

export const Default: Story = {
  args: {
    paragraph: mockParagraph as any,
  },
};
