import type { Meta, StoryObj } from '@storybook/react';
import ParagraphGallery from './ParagraphGallery';
import Image from 'next/image';

const meta: Meta<typeof ParagraphGallery> = {
  title: 'Editorial/Paragraph Gallery',
  component: ParagraphGallery,
  argTypes: {
    paragraph: {
      description: 'The paragraph data for the gallery',
      control: 'object',
    },
    modifier: {
      description: 'The modifier class to apply to the gallery component',
      control: 'text',
    },
  },
}; 

export default meta;
type Story = StoryObj<typeof ParagraphGallery>;

export const Default: Story = {
  args: {
    paragraph: {
      title: 'Optional Gallery Title',
      gallerySummary: {
        value: '<p>Optional summary text, turpis at luctus finibus, erat lectus convallis velit, at sodales purus lacus quis magna. Curabitur imperdiet sapien libero, fringilla ullamcorper nibh ullamcorper vitae. Proin sed luctus augue.</p>',
      },
      mediaItem: [
        {
          id: 'exampleGallery1',
          image: {
            url: './images/card.webp',
            alt: 'Gallery 1',
            width: 500,
            height: 300,
          },
        },
        {
          id: 'exampleGallery2',
          image: {
            url: './images/card.webp',
            alt: 'Gallery 2',
            width: 500,
            height: 300,
          },
        },
        {
          id: 'exampleGallery3',
          image: {
            url: './images/card.webp',
            alt: 'Gallery 3',
            width: 500,
            height: 300,
          },
        },
        {
          id: 'exampleGallery4',
          image: {
            url: './images/card.webp',
            alt: 'Gallery 4',
            width: 500,
            height: 300,
          },
        },
      ],
    } as any,
    modifier: 'p-2',
  },
};
