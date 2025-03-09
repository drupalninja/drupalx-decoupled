export const LinkFragment = /* GraphQL */ `
  fragment LinkFragment on Link {
    url
    title
    internal
  }
`;

export const TextFragment = /* GraphQL */ `
  fragment TextFragment on Text {
    format
    value
    processed
  }
`;

export const TextSummaryFragment = /* GraphQL */ `
  fragment TextSummaryFragment on TextSummary {
    value
    processed
    format
    summary
  }
`;

export const DateTimeFragment = /* GraphQL */ `
  fragment DateTimeFragment on DateTime {
    timestamp
    timezone
    offset
    time
  }
`;

export const LanguageFragment = /* GraphQL */ `
  fragment LanguageFragment on Language {
    id
    name
    direction
  }
`;
