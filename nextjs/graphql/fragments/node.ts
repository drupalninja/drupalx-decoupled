export const NodePageFragment = /* GraphQL */ `
  fragment NodePageFragment on NodePage {
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
  }
`;

export const NodeArticleFragment = /* GraphQL */ `
  fragment NodeArticleFragment on NodeArticle {
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
  }
`;

export const NodeLandingFragment = /* GraphQL */ `
  fragment NodeLandingFragment on NodeLanding {
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
    thumbnail {
      ...MediaUnionFragment
    }
    title
  }
`;
