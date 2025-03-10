import type { Meta, StoryObj } from '@storybook/react';
import Media from '../media/Media';
import Image from 'next/image';

const meta: Meta<typeof Media> = {
  title: 'Editorial/Media',
  component: Media,
  argTypes: {
    media: {
      description: 'React node to be rendered as media content',
      control: 'object',
    },
    modifier: {
      description: 'CSS classes to apply to the media container',
      control: 'text',
    },
    containerClassName: {
      description: 'CSS classes to apply to the outer container',
      control: 'text',
    },
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Media>;

const mockMedia = (
  <Image
    src="./images/card.webp"
    alt="Example image"
    width={1280}
    height={720}
    className="w-full h-auto"
  />
);

export const Default: Story = {
  args: {
    media: mockMedia,
    modifier: '',
    containerClassName: 'container mx-auto my-2 lg:my-10',
  },
};

export const Video: Story = {
  args: {
    media: <div className="aspect-video w-full">
      <iframe
        className="w-full h-full"
        src="https://www.youtube.com/embed/I95hSyocMlg?si=Ytzqa9QSnFHvFNan"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>,
    modifier: 'w-full max-w-full',
    containerClassName: 'container mx-auto my-2 lg:my-10',
  },
};
