import type { Meta, StoryObj } from '@storybook/react';
import Text from './Text';

const meta: Meta<typeof Text> = {
  title: 'Editorial/Text',
  component: Text,
  argTypes: {
    title: {
      control: 'text',
      description: 'The title of the text component',
    },
    body: {
      control: 'text',
      description: 'The main content of the text component',
    },
    linkFragment: {
      control: 'object',
      description: 'The primary link object',
    },
    linkFragment2: {
      control: 'object',
      description: 'The secondary link object',
    },
    eyebrow: {
      control: 'text',
      description: 'The eyebrow text',
    },
    textLayout: {
      control: 'select',
      options: ['default', 'centered'],
      description: 'The layout of the text component',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: {
    title: 'Title Lorem Ipsum Dolor',
    body: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mauris mi, aliquam in orci at, finibus malesuada elit. Vivamus ex ante, imperdiet nec odio ac, sollicitudin fermentum velit.</p>',
    eyebrow: 'Test eyebrow',
    linkFragment: {
      url: '#',
      title: 'Read more',
    },
    linkFragment2: {
      url: '#',
      title: 'Read more',
    },
    textLayout: 'default',
  },
};

export const Centered: Story = {
  args: {
    ...Default.args,
    textLayout: 'centered',
  },
};

export const NoLinks: Story = {
  args: {
    ...Default.args,
    linkFragment: undefined,
    linkFragment2: undefined,
  },
};

export const SingleLink: Story = {
  args: {
    ...Default.args,
    linkFragment2: undefined,
  },
};
