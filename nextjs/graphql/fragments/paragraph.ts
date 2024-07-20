import { graphql } from "@/graphql/gql.tada";
import { TextSummaryFragment, TextFragment, DateTimeFragment, LanguageFragment, LinkFragment } from "./misc";
import { MediaUnionFragment } from "./media";
// @todo fix use of NodeArticleTeaserFragment
// import { NodeArticleTeaserFragment  } from "./node";

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
  }
`, [
  ParagraphTextFragment,
  ParagraphMediaFragment,
  ParagraphQuoteFragment,
  ParagraphHeroFragment,
  ParagraphAccordionFragment,
  ParagraphCardGroupFragment,
])
