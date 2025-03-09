export const MainMenuQuery = /* GraphQL */ `
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
`;

export const FooterMenuQuery = /* GraphQL */ `
  query FooterMenuQuery {
    menu(name: FOOTER) {
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
`;
