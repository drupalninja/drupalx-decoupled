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
      control: 'object',
      description: 'The main content of the text component as TextFormat',
    },
    link: {
      control: 'object',
      description: 'The primary link object',
    },
    link2: {
      control: 'object',
      description: 'The secondary link object',
    },
    eyebrow: {
      control: 'text',
      description: 'The eyebrow text',
    },
    textLayout: {
      control: 'select',
      options: ['default', 'centered', 'buttons-right'],
      description: 'The layout of the text component',
    },
    modifier: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: {
    title: 'Title Lorem Ipsum Dolor',
    body: {
      value: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mauris mi, aliquam in orci at, finibus malesuada elit. Vivamus ex ante, imperdiet nec odio ac, sollicitudin fermentum velit.</p>',
      processed: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mauris mi, aliquam in orci at, finibus malesuada elit. Vivamus ex ante, imperdiet nec odio ac, sollicitudin fermentum velit.</p>',
      format: 'full_html',
    },
    eyebrow: 'Test eyebrow',
    link: {
      url: '#',
      title: 'Read more',
    },
    link2: {
      url: '#',
      title: 'Learn more',
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

export const ButtonsRight: Story = {
  args: {
    ...Default.args,
    textLayout: 'buttons-right',
  },
};

export const NoLinks: Story = {
  args: {
    ...Default.args,
    link: undefined,
    link2: undefined,
  },
};

export const SingleLink: Story = {
  args: {
    ...Default.args,
    link2: undefined,
  },
};
