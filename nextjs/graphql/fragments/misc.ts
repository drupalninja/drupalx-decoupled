import { graphql } from "@/graphql/gql.tada";

export const LinkFragment = graphql(`
  fragment LinkFragment on Link {
    url
    title
    internal
  }
`);

export const TextFragment = graphql(`
  fragment TextFragment on Text {
    format
    value
    processed
  }
`);

export const TextSummaryFragment = graphql(`fragment TextSummaryFragment on TextSummary {
  value
  processed
  format
  summary
}`);

export const DateTimeFragment = graphql(`fragment DateTimeFragment on DateTime {
  timestamp
  timezone
  offset
  time
}`)

export const LanguageFragment = graphql(`fragment LanguageFragment on Language {
  id
  name
  direction
}`)
