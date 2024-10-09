import { graphql } from "@/graphql/gql.tada";
import { ParagraphCardCompareFragment } from "@/components/paragraphs/ParagraphCardCompare";
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

export const ParagraphUnionFragment = graphql(`
  fragment ParagraphUnionFragment on ParagraphUnion {
    ... on ParagraphInterface {
      __typename
      id
    }
    ...ParagraphTextFragment
    ...ParagraphMediaFragment
    ...ParagraphQuoteFragment
    ...ParagraphHeroFragment
    ...ParagraphAccordionFragment
    ...ParagraphCardGroupFragment
    ...ParagraphGalleryFragment
    ...ParagraphSidebysideFragment
    ...ParagraphCarouselFragment
    ...ParagraphEmbedFragment
    ...ParagraphNewsletterFragment
    ...ParagraphViewFragment
  ...ParagraphCardCompareFragment
    ...ParagraphLogoCollectionFragment
  }
`, [
  ParagraphTextFragment,
  ParagraphMediaFragment,
  ParagraphQuoteFragment,
  ParagraphHeroFragment,
  ParagraphAccordionFragment,
  ParagraphCardGroupFragment,
  ParagraphGalleryFragment,
  ParagraphSidebysideFragment,
  ParagraphCarouselFragment,
  ParagraphEmbedFragment,
  ParagraphNewsletterFragment,
  ParagraphViewFragment,
  ParagraphCardCompareFragment,
  ParagraphLogoCollectionFragment,
])
