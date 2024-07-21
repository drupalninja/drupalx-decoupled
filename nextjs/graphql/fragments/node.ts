import { graphql } from "@/graphql/gql.tada";

import { MediaImageFragment, MediaUnionFragment } from "@/graphql/fragments/media";
import { UserFragment } from "@/graphql/fragments/user";
import { TextFragment, DateTimeFragment, LanguageFragment } from "@/graphql/fragments/misc";
import { MetatagFragment, MetaTagUnionFragment } from "./metatag";
import {
  ParagraphUnionFragment,
} from "./paragraph";

export const NodePageFragment = graphql(`
  fragment NodePageFragment on NodePage  {
    __typename
    id
    title
    summary
  }
`)

export const NodeArticleFragment = graphql(`
  fragment NodeArticleFragment on NodeArticle {
    __typename
    id
    title
    summary
    path
    lead {
      ...TextFragment
    }
    metatag {
      ...MetatagFragment
    }
    media {
      ...MediaImageFragment
    }
  }
`, [MetatagFragment, MediaImageFragment, TextFragment])

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
