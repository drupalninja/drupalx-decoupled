import { graphql } from "@/graphql/gql.tada";

export const MainMenuQuery = graphql(`
  query MainMenuQuery {
    menu(name: MAIN) {
      name
      items {
        title
        url
        children {
          title
          url
        }
      }
    }
  }
`);
