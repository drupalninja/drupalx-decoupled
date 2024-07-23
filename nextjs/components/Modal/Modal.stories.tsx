import type { Meta, StoryObj } from '@storybook/react';
import Modal from './Modal';

const meta: Meta<typeof Modal> = {
  title: 'General/Modal',
  component: Modal,
  argTypes: {
    buttonText: {
      description: 'The text for the button that launches the modal',
      control: 'text',
    },
    modalName: {
      description: 'The name of the modal',
      control: 'text',
    },
    title: {
      description: 'The title of the modal',
      control: 'text',
    },
    body: {
      description: 'The body text of the modal',
      control: 'text',
    },
    closeButtonName: {
      description: 'The name of the close button',
      control: 'text',
    },
    saveButton: {
      description: 'The save button object',
      control: 'object',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {
    buttonText: 'Launch demo modal',
    modalName: 'example',
    title: 'Modal Title',
    body: 'Modal body text goes here.',
    closeButtonName: 'Close',
    saveButton: {
      name: 'Save Changes',
      redirects: 'http://drupal.org/'
    }
  }
};
