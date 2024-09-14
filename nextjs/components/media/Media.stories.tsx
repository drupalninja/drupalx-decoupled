import type { Meta, StoryObj } from '@storybook/react';
import Media from '../media/Media';

const meta: Meta<typeof Media> = {
  title: 'Components/Media',
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

export const Default: Story = {
  args: {
    media: (
      <img
        src="./images/card.webp"
        alt="Card"
        width={800}
        height={600}
        className="w-full h-auto"
      />
    ),
  },
};

export const Video: Story = {
  args: {
    media: (
      <video
        src="./videos/sample.mp4"
        controls
        className="w-full h-auto"
      />
    ),
  },
};
