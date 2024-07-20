import { graphql } from "@/graphql/gql.tada";
import { DateTimeFragment, LanguageFragment } from "./misc";
import { MetaTagUnionFragment } from "./metatag";

export const ImageFragment = graphql(`
  fragment ImageFragment on Image {
    url
    width
    height
    alt
    title
  }
`)

export const MediaImageFragment = graphql(`
  fragment MediaImageFragment on MediaImage {
    id
    image {
      ...ImageFragment
    }
  }
`, [ImageFragment])

export const MediaVideoFragment = graphql(`fragment MediaVideoFragment on MediaVideo {
  id
  changed {
    ...DateTimeFragment
  }
  created {
    ...DateTimeFragment
  }
  langcode {
    ...LanguageFragment
  }
  metatag {
    ...MetaTagUnionFragment
  }
  name
  path
  source
  status
}`,
  [
    DateTimeFragment,
    LanguageFragment,
    MetaTagUnionFragment,
  ]
)

export const MediaUnionFragment = graphql(`fragment MediaUnionFragment on MediaUnion {
  ...MediaImageFragment
  ...MediaVideoFragment
}`,
[
  MediaImageFragment,
  MediaVideoFragment,
])