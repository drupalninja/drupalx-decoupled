export const ParagraphUnionFragment = /* GraphQL */ `
  fragment ParagraphUnionFragment on ParagraphUnion {
    __typename
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
