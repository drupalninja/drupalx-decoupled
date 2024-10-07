import type { Meta, StoryObj } from '@storybook/react';
import CardCompare from './CardCompare';

const meta: Meta<typeof CardCompare> = {
  title: 'Editorial/Card Compare',
  component: CardCompare,
  tags: ['autodocs'],
  argTypes: {
    includesLabel: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof CardCompare>;

export const Default: Story = {
  args: {
    tagline: "Choose Your Plan",
    title: "Compare Our Options",
    description: "Select the best option for your needs",
    includesLabel: "Includes",
    cards: [
      {
        title: "DrupalX CMS",
        price: "Free",
        monthlyLabel: "",
        features: ["Full access to open source features", "Community support", "Documentation"],
        ctaText: "Get Started",
        ctaAction: () => console.log("Free tier selected"),
      },
      {
        title: "Technical Discovery",
        price: "$5,000",
        monthlyLabel: "",
        features: ["Comprehensive needs assessment", "Custom solution design", "Implementation roadmap"],
        ctaText: "Book Discovery",
        ctaAction: () => console.log("Technical discovery selected"),
      },
      {
        title: "Full Project Build",
        price: "Contact",
        monthlyLabel: "",
        features: ["End-to-end project management", "Custom development", "Ongoing support"],
        ctaText: "Contact Sales",
        ctaAction: () => console.log("Full project build selected"),
      }
    ],
  },
};

export const TwoCards: Story = {
  args: {
    tagline: "Simple Pricing",
    title: "Compare Plans",
    description: "Choose the plan that fits your needs",
    includesLabel: "Features",
    cards: [
      {
        title: "Basic Plan",
        price: "$9.99",
        monthlyLabel: "mo",
        features: ["Up to 5 users", "Basic support", "1GB storage"],
        ctaText: "Choose Basic",
        ctaAction: () => console.log("Basic plan selected"),
      },
      {
        title: "Pro Plan",
        price: "$29.99",
        monthlyLabel: "mo",
        features: ["Unlimited users", "24/7 support", "10GB storage", "Advanced analytics"],
        ctaText: "Choose Pro",
        ctaAction: () => console.log("Pro plan selected"),
      }
    ],
  },
};
