import { graphql } from "@/graphql/gql.tada";
import { TextSummaryFragment, TextFragment, DateTimeFragment, LanguageFragment, LinkFragment } from "./misc";
import { MediaUnionFragment } from "./media";

export const ParagraphHeroFragment = graphql(`fragment ParagraphHeroFragment on ParagraphHero {
  id
  created {
    ...DateTimeFragment
  }
  heading {
    ...TextFragment
  }
  heroLayout
  langcode {
    ...LanguageFragment
  }
  link {
    ...LinkFragment
  }
  requiredMedia: media {
    ...MediaUnionFragment
  }
  status
  summary {
    ...TextFragment
  }
}`,
  [
    DateTimeFragment,
    TextFragment,
    LanguageFragment,
    LinkFragment,
    MediaUnionFragment,
  ]
)

export const ParagraphMediaFragment = graphql(`fragment ParagraphMediaFragment on ParagraphMedia {
  id
  created {
    ...DateTimeFragment
  }
  langcode {
    ...LanguageFragment
  }
  media {
    ...MediaUnionFragment
  }
  status
  title
}`,
  [
    DateTimeFragment,
    LanguageFragment,
    MediaUnionFragment,
  ]
)

export const ParagraphTextFragment = graphql(`fragment ParagraphTextFragment on ParagraphText {
  id
  body {
    ...TextSummaryFragment
  }
  created {
    ...DateTimeFragment
  }
  langcode {
    ...LanguageFragment
  }
  link {
    ...LinkFragment
  }
  status
  title
}`,
  [
    TextSummaryFragment,
    DateTimeFragment,
    LanguageFragment,
    LinkFragment,
  ]
)

export const ParagraphQuoteFragment = graphql(`fragment ParagraphQuoteFragment on ParagraphQuote {
  id
  author
  created {
    ...DateTimeFragment
  }
  jobTitle
  langcode {
    ...LanguageFragment
  }
  logo {
    ...MediaUnionFragment
  }
  quote
  status
  thumb {
    ...MediaUnionFragment
  }
}`,
  [
    DateTimeFragment,
    LanguageFragment,
    MediaUnionFragment,
  ]
)

export const ParagraphAccordionItemFragment = graphql(`fragment ParagraphAccordionItemFragment on ParagraphAccordionItem {
  id
  body {
    ...TextSummaryFragment
  }
  created {
    ...DateTimeFragment
  }
  langcode {
    ...LanguageFragment
  }
  link {
    ...LinkFragment
  }
  status
  title
}`,
  [
    TextSummaryFragment,
    DateTimeFragment,
    LanguageFragment,
    LinkFragment,
  ]
)

export const ParagraphAccordionFragment = graphql(`fragment ParagraphAccordionFragment on ParagraphAccordion {
  id
  accordionItem {
    ...ParagraphAccordionItemFragment
  }
  created {
    ...DateTimeFragment
  }
  langcode {
    ...LanguageFragment
  }
  status
  title
}`,
  [
    ParagraphAccordionItemFragment,
    DateTimeFragment,
    LanguageFragment,
  ]
)

export const ParagraphCardFragment = graphql(`fragment ParagraphCardFragment on ParagraphCard {
  id
  created {
    ...DateTimeFragment
  }
  langcode {
    ...LanguageFragment
  }
  link {
    ...LinkFragment
  }
  media {
    ...MediaUnionFragment
  }
  status
  summary
  title
}`,
  [
    DateTimeFragment,
    LanguageFragment,
    LinkFragment,
    MediaUnionFragment,
  ]
)

export const ParagraphCardGroupFragment = graphql(`fragment ParagraphCardGroupFragment on ParagraphCardGroup {
  id
  card {
    ...ParagraphCardFragment
  }
  created {
    ...DateTimeFragment
  }
  langcode {
    ...LanguageFragment
  }
  status
  title
}`,
  [
    ParagraphCardFragment,
    DateTimeFragment,
    LanguageFragment,
  ]
)

export const ParagraphGalleryFragment = graphql(`fragment ParagraphGalleryFragment on ParagraphGallery {
  id
  gallerySummary: body {
    ...TextSummaryFragment
  }
  created {
    ...DateTimeFragment
  }
  langcode {
    ...LanguageFragment
  }
  mediaItem {
    ...MediaUnionFragment
  }
  status
  title
}`,
  [
    TextSummaryFragment,
    DateTimeFragment,
    LanguageFragment,
    MediaUnionFragment,
  ]
)

export const ParagraphSidebysideFragment = graphql(`fragment ParagraphSidebysideFragment on ParagraphSidebyside {
  id
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
  media {
    ...MediaUnionFragment
  }
  sidebysideLayout
  status
  sidebysideSummary: summary {
    ...TextFragment
  }
  sidebysideTitle: title
}`,
  [
    DateTimeFragment,
    LanguageFragment,
    LinkFragment,
    MediaUnionFragment,
    TextFragment,
  ]
)

export const ParagraphCarouselItemFragment = graphql(`fragment ParagraphCarouselItemFragment on ParagraphCarouselItem {
  id
  created {
    ...DateTimeFragment
  }
  langcode {
    ...LanguageFragment
  }
  media {
    ...MediaUnionFragment
  }
  status
  summary
  title
}`,
  [
    DateTimeFragment,
    LanguageFragment,
    MediaUnionFragment,
  ]
)

export const ParagraphCarouselFragment = graphql(`fragment ParagraphCarouselFragment on ParagraphCarousel {
  id
  carouselItem {
    ...ParagraphCarouselItemFragment
  }
  created {
    ...DateTimeFragment
  }
  langcode {
    ...LanguageFragment
  }
  status
}`,
  [
    ParagraphCarouselItemFragment,
    DateTimeFragment,
    LanguageFragment,
  ]
)

export const ParagraphEmbedFragment = graphql(`fragment ParagraphEmbedFragment on ParagraphEmbed {
  id
  created {
    ...DateTimeFragment
  }
  langcode {
    ...LanguageFragment
  }
  script {
    ...TextFragment
  }
  status
  title
}`,
  [
    DateTimeFragment,
    LanguageFragment,
    TextFragment,
  ]
);

export const ParagraphNewsletterFragment = graphql(`fragment ParagraphNewsletterFragment on ParagraphNewsletter {
  id
  created {
    ...DateTimeFragment
  }
  langcode {
    ...LanguageFragment
  }
  status
}`,
  [
    DateTimeFragment,
    LanguageFragment,
  ]
)

export const ParagraphViewFragment = graphql(`fragment ParagraphViewFragment on ParagraphView {
  id
  created {
    ...DateTimeFragment
  }
  langcode {
    ...LanguageFragment
  }
  link {
    ...LinkFragment
  }
  status
  title
  viewsRef {
    __typename
    ... on RecentCardsArticleCardsResult {
      id
      view
      display
      results {
        ... on NodeArticle {
          id
          path
          title
          media {
            ...MediaImageFragment
          }
          created {
            ...DateTimeFragment
          }
          langcode {
            ...LanguageFragment
          }
          status
          summary
        }
      }
    }
  }
}`,
  [
    MediaUnionFragment,
    DateTimeFragment,
    LanguageFragment,
    LinkFragment,
    TextFragment,
  ]
)

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
])
