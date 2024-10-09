import type { Meta, StoryObj } from '@storybook/react';
import Pricing from './Pricing';

const meta: Meta<typeof Pricing> = {
  title: 'Editorial/Pricing',
  component: Pricing,
  tags: ['autodocs'],
  argTypes: {
    includesLabel: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof Pricing>;

export const Default: Story = {
  args: {
    eyebrow: "Choose Your Plan",
    title: "Compare Our Options",
    summary: "Select the best option for your needs",
    includesLabel: "Includes",
    cards: [
      {
        eyebrow: "DrupalX CMS",
        title: "Free",
        monthlyLabel: "",
        features: ["Full access to open source features", "Community support", "Documentation"],
        ctaText: "Get Started",
        ctaLink: "#",
      },
      {
        eyebrow: "Technical Discovery",
        title: "$5,000",
        monthlyLabel: "",
        features: ["Comprehensive needs assessment", "Custom solution design", "Implementation roadmap"],
        ctaText: "Book Discovery",
        ctaLink: "#",
      },
      {
        eyebrow: "Full Project Build",
        title: "Contact",
        monthlyLabel: "",
        features: ["End-to-end project management", "Custom development", "Ongoing support"],
        ctaText: "Contact Sales",
        ctaLink: "#",
      }
    ],
  },
};

export const TwoCards: Story = {
  args: {
    eyebrow: "Simple Pricing",
    title: "Compare Plans",
    summary: "Choose the plan that fits your needs",
    includesLabel: "Features",
    cards: [
      {
        eyebrow: "Basic Plan",
        title: "$9.99",
        monthlyLabel: "mo",
        features: ["Up to 5 users", "Basic support", "1GB storage"],
        ctaText: "Choose Basic",
        ctaLink: "#",
      },
      {
        eyebrow: "Pro Plan",
        title: "$29.99",
        monthlyLabel: "mo",
        features: ["Unlimited users", "24/7 support", "10GB storage", "Advanced analytics"],
        ctaText: "Choose Pro",
        ctaLink: "#",
      }
    ],
  },
};
