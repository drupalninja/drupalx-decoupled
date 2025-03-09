import { ParagraphPricingFragment } from "@/components/paragraphs/ParagraphPricing";
import { ParagraphLogoCollectionFragment } from "@/components/paragraphs/ParagraphLogoCollection";
import { ParagraphAccordionFragment } from "@/components/paragraphs/ParagraphAccordion";
import { ParagraphCardGroupFragment } from "@/components/paragraphs/ParagraphCardGroup";
import { ParagraphHeroFragment } from "@/components/paragraphs/ParagraphHero";
import { ParagraphMediaFragment } from "@/components/paragraphs/ParagraphMedia";
import { ParagraphTextFragment } from "@/components/paragraphs/ParagraphText";
import { ParagraphQuoteFragment } from "@/components/paragraphs/ParagraphQuote";
import { ParagraphGalleryFragment } from "@/components/paragraphs/ParagraphGallery";
import { ParagraphSidebysideFragment } from "@/components/paragraphs/ParagraphSidebyside";
import { ParagraphCarouselFragment } from "@/components/paragraphs/ParagraphCarousel";
import { ParagraphEmbedFragment } from "@/components/paragraphs/ParagraphEmbed";
import { ParagraphNewsletterFragment } from "@/components/paragraphs/ParagraphNewsletter";
import { ParagraphViewFragment } from "@/components/paragraphs/ParagraphView";

export const ParagraphUnionFragment = /* GraphQL */ `
  fragment ParagraphUnionFragment on ParagraphUnion {
    __typename
    ... on ParagraphInterface {
      id
      created {
        timestamp
        timezone
      }
      langcode {
        id
        name
      }
      status
    }
    ...ParagraphAccordionFragment
    ...ParagraphCardGroupFragment
    ...ParagraphCarouselFragment
    ...ParagraphEmbedFragment
    ...ParagraphGalleryFragment
    ...ParagraphHeroFragment
    ...ParagraphLogoCollectionFragment
    ...ParagraphMediaFragment
    ...ParagraphNewsletterFragment
    ...ParagraphPricingFragment
    ...ParagraphQuoteFragment
    ...ParagraphSidebysideFragment
    ...ParagraphTextFragment
    ...ParagraphViewFragment
  }
`;
