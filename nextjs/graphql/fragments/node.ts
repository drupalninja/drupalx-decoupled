import { graphql } from "@/graphql/gql.tada";

import { MediaImageFragment } from "@/graphql/fragments/media";
import { UserFragment } from "@/graphql/fragments/user";
import { TextFragment } from "@/graphql/fragments/misc";
import { MetatagFragment } from "./metatag";
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

export const NodeLayoutFragment = graphql(`
  fragment NodeLayoutFragment on NodeLayout {
    __typename
    id
    title
    summary
    path
    metatag {
      ...MetatagFragment
    }
    content {
      ...ParagraphUnionFragment
    }
  }
`, [MetatagFragment, MediaImageFragment, TextFragment, ParagraphUnionFragment])

export const NodeArticleTeaserFragment = graphql(`
  fragment NodeArticleTeaserFragment on NodeArticle {
    __typename
    id
    title
    summary
    path
  }
`)
