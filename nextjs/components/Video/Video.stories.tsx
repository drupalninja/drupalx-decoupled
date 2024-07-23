import type { Meta, StoryObj } from '@storybook/react';
import Video from './Video';

const meta: Meta<typeof Video> = {
  title: 'General/Video',
  component: Video,
  argTypes: {
    video: {
      description: 'Define the video embed',
      control: 'text',
    },
  },
};

type Story = StoryObj<typeof Video>;
export default meta;

export const Default: Story = {
  args: {
    video: '<iframe width="560" height="315" src="https://www.youtube.com/embed/I95hSyocMlg?si=1n8TVSmIkVxSCHxa" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
  },
};
