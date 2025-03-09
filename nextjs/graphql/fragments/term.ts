export const TermAuthorFragment = /* GraphQL */ `
  fragment TermAuthorFragment on TermAuthor {
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
  }
`;

export const TermTagFragment = /* GraphQL */ `
  fragment TermTagFragment on TermTag {
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
  }
`;

export const TermUnionFragment = /* GraphQL */ `
  fragment TermUnionFragment on TermUnion {
    ...TermAuthorFragment
    ...TermTagFragment
  }
`;
