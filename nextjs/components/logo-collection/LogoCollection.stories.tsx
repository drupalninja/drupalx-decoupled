import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import LogoCollection from './LogoCollection';
import Image from 'next/image';

const meta: Meta<typeof LogoCollection> = {
  title: 'Editorial/Logo Collection',
  component: LogoCollection,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LogoCollection>;

const sampleLogos = [
  {
    name: "Webflow",
    media: <Image src="./images/card.webp" alt="Webflow logo" width={320} height={200} />
  },
  {
    name: "Relume",
    media: <Image src="./images/card.webp" alt="Relume logo" width={320} height={200} />
  },
  {
    name: "Figma",
    media: <Image src="./images/card.webp" alt="Figma logo" width={320} height={200} />
  },
];

export const Default: Story = {
  args: {
    title: "Trusted by top companies worldwide",
    logos: sampleLogos,
  },
};

export const FewLogos: Story = {
  args: {
    title: "Our Partners",
    logos: sampleLogos.slice(0, 2),
  },
};

export const ManyLogos: Story = {
  args: {
    title: "Clients We've Worked With",
    logos: [...sampleLogos, ...sampleLogos],
  },
};
