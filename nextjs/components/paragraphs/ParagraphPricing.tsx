import Pricing, { PricingProps, PricingCardProps } from '../pricing/Pricing';

export const ParagraphPricingCardFragment = /* GraphQL */ `
  fragment ParagraphPricingCardFragment on ParagraphPricingCard {
    id
    featuresText
    created {
      ...DateTimeFragment
    }
    eyebrow
    langcode {
      ...LanguageFragment
    }
    link {
      ...LinkFragment
    }
    status
    suffix
    title
  }
`;

export const ParagraphPricingFragment = /* GraphQL */ `
  fragment ParagraphPricingFragment on ParagraphPricing {
    id
    pricingCards {
      ...ParagraphPricingCardFragment
    }
    created {
      ...DateTimeFragment
    }
    pricingSummary: summary {
      ...TextFragment
    }
    langcode {
      ...LanguageFragment
    }
    status
    eyebrow
    pricingTitle: title
  }
`;

interface ParagraphPricingProps {
  paragraph: {
    id: string;
    eyebrow?: string;
    pricingTitle?: string;
    pricingSummary?: {
      value?: string;
      processed?: string;
      format?: string;
    };
    pricingCards?: Array<{
      id: string;
      eyebrow?: string;
      title?: string;
      featuresText?: string;
      link?: {
        title?: string;
        url?: string;
        internal?: boolean;
      };
    }>;
  };
}

interface TextType {
  value?: string;
  processed?: string;
  format?: string;
}

interface PricingCardType {
  eyebrow?: string;
  title?: string;
  featuresText?: string;
  link?: {
    title?: string;
    url?: string;
  };
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
    summary: (pricingSummary as TextType)?.value || undefined,
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
