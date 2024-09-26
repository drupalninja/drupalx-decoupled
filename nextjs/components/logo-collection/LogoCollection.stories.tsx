import type { Meta, StoryObj } from '@storybook/react';
import LogoCollection, { LogoCollectionProps } from './LogoCollection';

const meta: Meta<typeof LogoCollection> = {
  title: 'Editorial/Logo Collection',
  component: LogoCollection,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LogoCollection>;

const sampleLogos: LogoCollectionProps['logos'] = [
  { name: "Webflow", logo: "/next.svg" },
  { name: "Relume", logo: "/next.svg" },
  { name: "Figma", logo: "/next.svg" },
  { name: "Framer", logo: "/next.svg" },
  { name: "Sketch", logo: "/next.svg" },
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
    logos: sampleLogos.slice(0, 3),
  },
};

export const ManyLogos: Story = {
  args: {
    title: "Clients We've Worked With",
    logos: [...sampleLogos, ...sampleLogos],
  },
};
