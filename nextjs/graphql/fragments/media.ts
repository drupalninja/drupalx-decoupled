export const ImageFragment = /* GraphQL */ `
  fragment ImageFragment on Image {
    url
    width
    height
    alt
    title
    variations(styles: [I11SMALL, I11MEDIUM, I11LARGE, HEROLX2, HEROS, I43SMALL, I43LARGE2X, I169LARGE2X, MEDIUM, LARGE]) {
      name
      url
      width
      height
    }
  }
`;

export const SvgImageFragment = /* GraphQL */ `
  fragment SvgImageFragment on Image {
    url
    width
    height
    alt
    title
  }
`;

export const SvgMediaFragment = /* GraphQL */ `
  fragment SvgMediaFragment on MediaSvgImage {
    id
    image {
      ...SvgImageFragment
    }
  }
`;

export const MediaImageFragment = /* GraphQL */ `
  fragment MediaImageFragment on MediaImage {
    id
    changed {
      ...DateTimeFragment
    }
    created {
      ...DateTimeFragment
    }
    image {
      ...ImageFragment
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
  }
`;

export const MediaVideoFragment = /* GraphQL */ `
  fragment MediaVideoFragment on MediaVideo {
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
  }
`;

export const MediaUnionFragment = /* GraphQL */ `
  fragment MediaUnionFragment on MediaUnion {
    ...MediaImageFragment
    ...MediaVideoFragment
  }
`;
