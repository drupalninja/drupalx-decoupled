import { graphql } from "@/graphql/gql.tada";

export const MetatagFragment = graphql(`
  fragment MetatagFragment on MetaTag @_unmask {
    __typename
    ... on MetaTagLink {
      attributes {
        rel
        href
      }
    }
    ... on MetaTagValue {
      attributes {
        name
        content
      }
    }
    ... on MetaTagProperty {
      attributes {
        property
        content
      }
    }
  }
`);

export const MetaTagLinkAttributesFragment = graphql(`fragment MetaTagLinkAttributesFragment on MetaTagLinkAttributes {
  href
  hreflang
  rel
  media
  sizes
  type
}`)

export const MetaTagValueAttributesFragment = graphql(`fragment MetaTagValueAttributesFragment on MetaTagValueAttributes {
  name
  content
}`)

export const MetaTagPropertyAttributesFragment = graphql(`fragment MetaTagPropertyAttributesFragment on MetaTagPropertyAttributes {
  property
  content
}`)

export const MetaTagLinkFragment = graphql(`fragment MetaTagLinkFragment on MetaTagLink {
  tag
  attributes {
    ...MetaTagLinkAttributesFragment
  }
}`,
  [
    MetaTagLinkAttributesFragment,
  ]
)

export const MetaTagValueFragment = graphql(`fragment MetaTagValueFragment on MetaTagValue {
  tag
  attributes {
    ...MetaTagValueAttributesFragment
  }
}`,
  [
    MetaTagValueAttributesFragment,
  ]
)

export const MetaTagPropertyFragment = graphql(`fragment MetaTagPropertyFragment on MetaTagProperty {
  tag
  attributes {
    ...MetaTagPropertyAttributesFragment
  }
}`,
  [
    MetaTagPropertyAttributesFragment,
  ]
)

export const MetaTagScriptAttributesFragment = graphql(`fragment MetaTagScriptAttributesFragment on MetaTagScriptAttributes {
  type
  src
  integrity
}`)

export const MetaTagScriptFragment = graphql(`fragment MetaTagScriptFragment on MetaTagScript {
  tag
  attributes {
    ...MetaTagScriptAttributesFragment
  }
  content
}`,
  [
    MetaTagScriptAttributesFragment,
  ]
)

export const MetaTagUnionFragment = graphql(`fragment MetaTagUnionFragment on MetaTagUnion {
  ...MetaTagLinkFragment
  ...MetaTagValueFragment
  ...MetaTagPropertyFragment
  ...MetaTagScriptFragment
}`,
[
  MetaTagLinkFragment,
  MetaTagValueFragment,
  MetaTagPropertyFragment,
  MetaTagScriptFragment,
])