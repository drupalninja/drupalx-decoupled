import type { Meta, StoryObj } from '@storybook/react';
import Carousel from './Carousel';

const meta: Meta<typeof Carousel> = {
  title: 'Editorial/Carousel',
  component: Carousel,
  argTypes: {
    list: {
      description: 'Define the array of carousel items',
      control: 'object',
    }
  }
};

export default meta;
type Story = StoryObj<typeof Carousel>;

export const Default: Story = {
  args: {
    id: 'single',
    list: [
      {
        active: true,
        image: '<img src="https://placehold.co/600x300/333333/FFF?text=First slide" class="d-block w-100" alt="test image" />',
        title: 'First slide label',
        caption: 'First slide caption',
        id: 'single',
      },
      {
        active: false,
        image: '<img src="https://placehold.co/600x300/333333/FFF?text=Second slide" class="d-block w-100" alt="test image" />',
        title: 'Second slide label',
        caption: 'Second slide caption',
        id: 'single',
      },
      {
        active: false,
        image: '<img src="https://placehold.co/600x300/333333/FFF?text=Third slide" class="d-block w-100" alt="test image" />',
        title: 'Third slide label',
        caption: 'Third slide caption',
        id: 'single',
      }
    ]
  }
};
