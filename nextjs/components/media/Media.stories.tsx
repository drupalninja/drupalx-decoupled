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
  />
);

export const Default: Story = {
  args: {
    media: mockMedia,
    modifier: 'w-1/2',
  },
};

export const Video: Story = {
  args: {
    media: <iframe width="560" height="315" src="https://www.youtube.com/embed/I95hSyocMlg?si=Ytzqa9QSnFHvFNan" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>,
    modifier: '',
  },
};
