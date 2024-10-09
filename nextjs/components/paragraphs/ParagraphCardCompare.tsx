import React from 'react';
import { FragmentOf, readFragment, graphql } from 'gql.tada';
import { DateTimeFragment, LanguageFragment, TextFragment, LinkFragment } from '@/graphql/fragments/misc';
import CardCompare, { CardCompareProps, CompareCardProps } from '../pricing/Pricing';

const ParagraphCardFragment = graphql(`fragment ParagraphCompareFragment on ParagraphCompare {
  id
  bullets
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

export const ParagraphCardCompareFragment = graphql(`
  fragment ParagraphCardCompareFragment on ParagraphCardCompare {
    id
    cards {
      ... ParagraphCompareFragment
    }
    created {
      ... DateTimeFragment
    }
    compareSummary: summary {
      ... TextFragment
    }
    bulletsHeading
    langcode {
      ... LanguageFragment
    }
    status
    eyebrow
    compareTitle: title
  }
  `, [ParagraphCardFragment, DateTimeFragment, TextFragment, LanguageFragment]);

interface ParagraphCardCompareProps {
  paragraph: FragmentOf<typeof ParagraphCardCompareFragment>;
}

export default function ParagraphCardCompare({ paragraph }: ParagraphCardCompareProps) {
  const { eyebrow, compareTitle, compareSummary, bulletsHeading, cards } = readFragment(ParagraphCardCompareFragment, paragraph);

  // Helper function to split bullet string into an array
  const splitBullets = (bulletsString: string | null | undefined): string[] => {
    if (!bulletsString) return [];
    return bulletsString.split('\n').filter(bullet => bullet.trim() !== '');
  };

  // Transform the data for CardCompare
  const cardCompareProps: CardCompareProps = {
    tagline: eyebrow || undefined,
    title: compareTitle || undefined,
    description: compareSummary?.value || undefined,
    includesLabel: bulletsHeading ?? "Includes",
    cards: cards.map((card): CompareCardProps => ({
      title: card.eyebrow || "",
      price: card.title || "",
      features: splitBullets(card.bullets),
      ctaText: card.link?.title || "Learn More",
      ctaLink: card.link?.url || "#",
    }))
  };

  return (
    <div className="container mx-auto">
      <CardCompare {...cardCompareProps} />
    </div>
  );
}
