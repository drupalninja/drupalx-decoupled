import { LinkFormat, TextFormat } from '@/lib/types';
import Pricing, { PricingProps, PricingCardProps } from '../pricing/Pricing';

export const ParagraphPricingCardFragment = /* GraphQL */ `
  fragment ParagraphPricingCardFragment on ParagraphPricingCard {
    featuresText
    eyebrow
    link {
      ...LinkFragment
    }
    suffix
    title
  }
`;

export const ParagraphPricingFragment = /* GraphQL */ `
  fragment ParagraphPricingFragment on ParagraphPricing {
    pricingCards {
      ...ParagraphPricingCardFragment
    }
    pricingSummary: summary {
      ...TextFragment
    }
    eyebrow
    pricingTitle: title
  }
`;

interface ParagraphPricingProps {
  paragraph: {
    eyebrow?: string;
    pricingTitle?: string;
    pricingSummary?: TextFormat;
    pricingCards?: Array<{
      eyebrow?: string;
      title?: string;
      featuresText?: string;
      link?: LinkFormat;
    }>;
  };
}

interface PricingCardType {
  eyebrow?: string;
  title?: string;
  featuresText?: string;
  link?: LinkFormat;
}

export default function ParagraphPricing({ paragraph }: ParagraphPricingProps) {
  const { eyebrow, pricingTitle, pricingSummary, pricingCards } = paragraph;

  // Helper function to split bullet string into an array
  const splitBullets = (bulletsString: string | null | undefined): string[] => {
    if (!bulletsString) return [];
    return bulletsString.split('\n').filter(bullet => bullet.trim() !== '');
  };

  // Transform the data for Pricing
  const cardPricingProps: PricingProps = {
    eyebrow: eyebrow || undefined,
    title: pricingTitle || undefined,
    summary: (pricingSummary as TextFormat)?.value || undefined,
    includesLabel: "Includes",
    cards: (pricingCards as PricingCardType[])?.map((card): PricingCardProps => ({
      eyebrow: card.eyebrow || "",
      title: card.title || "",
      features: splitBullets(card.featuresText),
      ctaText: card.link?.title || "Learn More",
      ctaLink: card.link?.url || "#",
    })) || []
  };

  return (
    <Pricing {...cardPricingProps} />
  );
}
