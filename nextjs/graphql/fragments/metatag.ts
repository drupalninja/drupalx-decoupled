export const MetatagFragment = /* GraphQL */ `
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
`;

export const MetaTagLinkAttributesFragment = /* GraphQL */ `
  fragment MetaTagLinkAttributesFragment on MetaTagLinkAttributes {
    href
    hreflang
    rel
    media
    sizes
    type
  }
`;

export const MetaTagValueAttributesFragment = /* GraphQL */ `
  fragment MetaTagValueAttributesFragment on MetaTagValueAttributes {
    name
    content
  }
`;

export const MetaTagPropertyAttributesFragment = /* GraphQL */ `
  fragment MetaTagPropertyAttributesFragment on MetaTagPropertyAttributes {
    property
    content
  }
`;

export const MetaTagScriptAttributesFragment = /* GraphQL */ `
  fragment MetaTagScriptAttributesFragment on MetaTagScriptAttributes {
    type
    src
    integrity
  }
`;

export const MetaTagLinkFragment = /* GraphQL */ `
  fragment MetaTagLinkFragment on MetaTagLink {
    tag
    attributes {
      ...MetaTagLinkAttributesFragment
    }
  }
`;

export const MetaTagValueFragment = /* GraphQL */ `
  fragment MetaTagValueFragment on MetaTagValue {
    tag
    attributes {
      ...MetaTagValueAttributesFragment
    }
  }
`;

export const MetaTagPropertyFragment = /* GraphQL */ `
  fragment MetaTagPropertyFragment on MetaTagProperty {
    tag
    attributes {
      ...MetaTagPropertyAttributesFragment
    }
  }
`;

export const MetaTagScriptFragment = /* GraphQL */ `
  fragment MetaTagScriptFragment on MetaTagScript {
    tag
    attributes {
      ...MetaTagScriptAttributesFragment
    }
    content
  }
`;

export const MetaTagUnionFragment = /* GraphQL */ `
  fragment MetaTagUnionFragment on MetaTagUnion {
    ...MetaTagLinkFragment
    ...MetaTagValueFragment
    ...MetaTagPropertyFragment
    ...MetaTagScriptFragment
  }
`;
