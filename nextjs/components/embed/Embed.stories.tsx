import type { Meta, StoryObj } from '@storybook/react';
import Embed from './Embed';

const meta: Meta<typeof Embed> = {
  title: 'Editorial/Embed',
  component: Embed,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Embed>;

const mockContent = '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50704.05332036616!2d-122.12246645666515!3d37.413396126075966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb7495bec0189%3A0x7c17d44a466baf9b!2sMountain%20View%2C%20CA!5e0!3m2!1sen!2sus!4v1716313314254!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Sample Google Map for Storybook"></iframe>';

export const Default: Story = {
  args: {
    content: mockContent,
  },
};

export const WithTitle: Story = {
  args: {
    title: "Google Maps Embed",
    content: mockContent,
  },
};

export const WithCustomClassName: Story = {
  args: {
    title: "Custom Styled Embed",
    content: mockContent,
    className: "bg-gray-100 p-4",
  },
};
