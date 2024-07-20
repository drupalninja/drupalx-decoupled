import type { Meta, StoryObj } from '@storybook/react';
import GalleryLightbox from './GalleryLightbox';
import Image from 'next/image';

const meta: Meta<typeof GalleryLightbox> = {
  title: 'Editorial/Gallery',
  component: GalleryLightbox,
  argTypes: {
    sectionTitle: {
      description: 'The title of the gallery lightbox component',
      control: 'text',
    },
    introText: {
      description: 'Optional intro text for the gallery lightbox component',
      control: 'text',
    },
    galleryItems: {
      description: 'Define the array of gallery lightbox items',
      control: 'object',
    },
    modifier: {
      description: 'The modifier class to apply to the gallery lightbox component',
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof GalleryLightbox>;

export const Default: Story = {
  args: {
    sectionTitle: 'Optional Title',
    modifier: 'p-2',
    introText:
      '<p>Optional summary text, turpis at luctus finibus, erat lectus convallis velit, at sodales purus lacus quis magna. Curabitur imperdiet sapien libero, fringilla ullamcorper nibh ullamcorper vitae. Proin sed luctus augue.</p>',
    galleryItems: [
      {
        id: 'exampleLightbox1',
        media: <Image src="./images/card.webp" className="card-img-top" alt="Gallery 1" width={500} height={300} />,
        mediaThumb: <Image src="./images/card.webp" className="img-fluid" alt="Gallery 1" width={500} height={300} />,
        mediaDescription: 'Gallery 1 here!',
      },
      {
        id: 'exampleLightbox2',
        media: <Image src="./images/card.webp" className="card-img-top" alt="Gallery 2" width={500} height={300} />,
        mediaThumb: <Image src="./images/card.webp" className="img-fluid" alt="Gallery 2" width={500} height={300} />,
        mediaDescription: 'Gallery 2 here!',
      },
      {
        id: 'exampleLightbox3',
        media: <Image src="./images/card.webp" className="card-img-top" alt="Gallery 3" width={500} height={300} />,
        mediaThumb: <Image src="./images/card.webp" className="img-fluid" alt="Gallery 3" width={500} height={300} />,
        mediaDescription: 'Gallery 3 here!',
      },
      {
        id: 'exampleLightbox4',
        media: <Image src="./images/card.webp" className="card-img-top" alt="Gallery 4" width={500} height={300} />,
        mediaThumb: <Image src="./images/card.webp" className="img-fluid" alt="Gallery 4" width={500} height={300} />,
        mediaDescription: 'Gallery 4 here!',
      },
    ],
  }
};
