import { graphql } from "@/graphql/gql.tada";

import { MediaUnionFragment } from "@/graphql/fragments/media";
import { UserFragment } from "@/graphql/fragments/user";
import { TextFragment, TextSummaryFragment, DateTimeFragment, LanguageFragment } from "@/graphql/fragments/misc";
import { MetaTagUnionFragment } from "./metatag";
import { ParagraphUnionFragment} from "./paragraph";
import { TermUnionFragment } from "./term";

export const NodePageFragment = graphql(`fragment NodePageFragment on NodePage {
  id
  author {
    ...UserFragment
  }
  body {
    ...TextSummaryFragment
  }
  changed {
    ...DateTimeFragment
  }
  created {
    ...DateTimeFragment
  }
  langcode {
    ...LanguageFragment
  }
  mediaPage: media {
    ...MediaUnionFragment
  }
  metatag {
    ...MetaTagUnionFragment
  }
  path
  promote
  status
  sticky
  summary
  thumbnail {
    ...MediaUnionFragment
  }
  title
}`,
  [
    UserFragment,
    TextSummaryFragment,
    DateTimeFragment,
    LanguageFragment,
    MediaUnionFragment,
    MetaTagUnionFragment,
  ]
)

export const NodeArticleFragment = graphql(`fragment NodeArticleFragment on NodeArticle {
  id
  author {
    ...UserFragment
  }
  authors {
    ...TermUnionFragment
  }
  body {
    ...TextSummaryFragment
  }
  changed {
    ...DateTimeFragment
  }
  created {
    ...DateTimeFragment
  }
  langcode {
    ...LanguageFragment
  }
  lead {
    ...TextFragment
  }
  media {
    ...MediaUnionFragment
  }
  metatag {
    ...MetaTagUnionFragment
  }
  path
  promote
  status
  sticky
  subhead
  summary
  tags {
    ...TermUnionFragment
  }
  thumbnail {
    ...MediaUnionFragment
  }
  title
}`,
  [
    UserFragment,
    TermUnionFragment,
    TextSummaryFragment,
    DateTimeFragment,
    LanguageFragment,
    TextFragment,
    MediaUnionFragment,
    MetaTagUnionFragment,
  ]
)

export const NodeLayoutFragment = graphql(`fragment NodeLayoutFragment on NodeLayout {
  id
  author {
    ...UserFragment
  }
  changed {
    ...DateTimeFragment
  }
  content {
    ...ParagraphUnionFragment
  }
  created {
    ...DateTimeFragment
  }
  hidePageTitle
  langcode {
    ...LanguageFragment
  }
  metatag {
    ...MetaTagUnionFragment
  }
  path
  promote
  status
  sticky
  summary
  thumbnail {
    ...MediaUnionFragment
  }
  title
}`,
  [
    UserFragment,
    DateTimeFragment,
    ParagraphUnionFragment,
    LanguageFragment,
    MetaTagUnionFragment,
    MediaUnionFragment,
  ]
)
