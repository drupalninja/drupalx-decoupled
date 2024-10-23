import React from 'react';
import { FragmentOf, readFragment, graphql } from 'gql.tada';
import { DateTimeFragment, LanguageFragment, TextFragment, LinkFragment } from '@/graphql/fragments/misc';
import Pricing, { PricingProps, PricingCardProps } from '../pricing/Pricing';

const ParagraphPricingCardFragment = graphql(`fragment ParagraphPricingCardFragment on ParagraphPricingCard {
  id
  featuresText
  created {
    ... DateTimeFragment
  }
  eyebrow
  langcode {
    ... LanguageFragment
  }
  link {
    ... LinkFragment
  }
  status
  suffix
  title
}`,
  [
    DateTimeFragment,
    LanguageFragment,
    LinkFragment,
  ]
);

export const ParagraphPricingFragment = graphql(`
  fragment ParagraphPricingFragment on ParagraphPricing {
    id
    pricingCards {
      ... ParagraphPricingCardFragment
    }
    created {
      ... DateTimeFragment
    }
    pricingSummary: summary {
      ... TextFragment
    }
    langcode {
      ... LanguageFragment
    }
    status
    eyebrow
    pricingTitle: title
  }
  `, [ParagraphPricingCardFragment, DateTimeFragment, TextFragment, LanguageFragment]);

interface ParagraphPricingProps {
  paragraph: FragmentOf<typeof ParagraphPricingFragment>;
}

export default function ParagraphPricing({ paragraph }: ParagraphPricingProps) {
  const { eyebrow, pricingTitle, pricingSummary, pricingCards, featuresText } = readFragment(ParagraphPricingFragment, paragraph);

  // Helper function to split bullet string into an array
  const splitBullets = (bulletsString: string | null | undefined): string[] => {
    if (!bulletsString) return [];
    return bulletsString.split('\n').filter(bullet => bullet.trim() !== '');
  };

  // Transform the data for Pricing
  const cardPricingProps: PricingProps = {
    eyebrow: eyebrow || undefined,
    title: pricingTitle || undefined,
    summary: (pricingSummary as any).value || undefined,
    includesLabel: "Includes",
    cards: (pricingCards as any).map((card: any): PricingCardProps => ({
      eyebrow: card.eyebrow || "",
      title: card.title || "",
      features: splitBullets(card.featuresText),
      ctaText: card.link?.title || "Learn More",
      ctaLink: card.link?.url || "#",
    }))
  };

  return (
    <div className="container mx-auto">
      <Pricing {...cardPricingProps} />
    </div>
  );
}
