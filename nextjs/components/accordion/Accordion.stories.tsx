import type { Meta, StoryObj } from '@storybook/react';
import Accordion from './Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Editorial/Accordion',
  component: Accordion,
  argTypes: {
    title: {
      control: 'text',
      description: 'Title for the accordion group',
    },
    modifier: {
      control: 'text',
      description: 'Modifier class for the accordion group',
    },
    containerModifier: {
      control: 'text',
      description: 'Modifier class for the container',
    },
    items: {
      description: 'Array of AccordionItemData',
      control: 'object',
    },
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  args: {
    title: 'Accordion Group Title',
    modifier: '',
    containerModifier: '',
    items: [
      {
        id: 'item-1',
        title: 'Curabitur aliquet quam id dui posuere blandit.',
        body: {
          value: '<p>Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Proin eget tortor risus. Donec rutrum congue leo eget malesuada. Donec sollicitudin molestie malesuada. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.</p>',
        },
        link: {
          url: 'https://www.google.com',
          title: 'Learn more',
        },
      },
      {
        id: 'item-2',
        title: 'Nulla porttitor accumsan tincidunt.',
        body: {
          value: '<p>Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Vivamus suscipit tortor eget felis porttitor volutpat. Sed porttitor lectus nibh. Pellentesque in ipsum id orci porta dapibus.</p>',
        },
        link: {
          url: 'https://www.example.com',
          title: 'Read more',
        },
      },
      {
        id: 'item-3',
        title: 'Vestibulum ante ipsum primis in faucibus.',
        body: {
          value: '<p>Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Donec sollicitudin molestie malesuada. Nulla quis lorem ut libero malesuada feugiat. Curabitur aliquet quam id dui posuere blandit. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.</p>',
        },
      },
    ],
  },
};
