import type { Meta, StoryObj } from '@storybook/react';
import ParagraphEmbed from './ParagraphEmbed';
import { ParagraphEmbedFragment } from '@/graphql/fragments/paragraph';
import { TextFragment } from '@/graphql/fragments/misc';

const meta: Meta<typeof ParagraphEmbed> = {
  title: 'Editorial/Paragraph Embed',
  component: ParagraphEmbed,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ParagraphEmbed>;

const mockParagraph = {
  script: {
    value: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50704.05332036616!2d-122.12246645666515!3d37.413396126075966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb7495bec0189%3A0x7c17d44a466baf9b!2sMountain%20View%2C%20CA!5e0!3m2!1sen!2sus!4v1716313314254!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
  },
};

export const Default: Story = {
  args: {
    paragraph: mockParagraph as any,
    modifier: '',
  },
};
