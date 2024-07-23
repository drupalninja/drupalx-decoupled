import { graphql } from "@/graphql/gql.tada";
import { DateTimeFragment, TextFragment, LanguageFragment } from "./misc";
import { MetaTagUnionFragment } from "./metatag";

export const TermAuthorFragment = graphql(`fragment TermAuthorFragment on TermAuthor {
  id
  changed {
    ...DateTimeFragment
  }
  description {
    ...TextFragment
  }
  langcode {
    ...LanguageFragment
  }
  metatag {
    ...MetaTagUnionFragment
  }
  name
  path
  status
  weight
}`,
  [
    DateTimeFragment,
    TextFragment,
    LanguageFragment,
    MetaTagUnionFragment,
  ]
)

export const TermTagFragment = graphql(`fragment TermTagFragment on TermTag {
  id
  changed {
    ...DateTimeFragment
  }
  description {
    ...TextFragment
  }
  langcode {
    ...LanguageFragment
  }
  metatag {
    ...MetaTagUnionFragment
  }
  name
  path
  status
  weight
}`,
  [
    DateTimeFragment,
    TextFragment,
    LanguageFragment,
    MetaTagUnionFragment,
  ]
)

export const TermUnionFragment = graphql(`fragment TermUnionFragment on TermUnion {
    ...TermAuthorFragment
    ...TermTagFragment
}`,
  [
    TermAuthorFragment,
    TermTagFragment,
  ]
)
