import type { Meta, StoryObj } from '@storybook/react';
import './NewsletterForm.scss';
import NewsletterForm from './NewsletterForm';

const meta: Meta<typeof NewsletterForm> = {
  title: 'Editorial/Newsletter Form',
  component: NewsletterForm,
  argTypes: {
    modifier: {
      description: 'The modifier class to apply to the newsletter form component',
      control: 'text'
    }
  }
};

export default meta;
type Story = StoryObj<typeof NewsletterForm>;

export const Default: Story = {
  args: {
    modifier: 'border p-4 rounded'
  }
};
