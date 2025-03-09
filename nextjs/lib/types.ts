export interface ImageVariation {
  name: string;
  url: string;
  width?: number;
  height?: number;
}

export interface MediaImage {
  __typename?: string;
  id?: string;
  image?: {
    url?: string;
    alt?: string;
    width?: number;
    height?: number;
    variations?: ImageVariation[];
  };
}

export interface TextFormat {
  value?: string;
  processed?: string;
  format?: string;
  summary?: string;
}

export interface LinkFormat {
  url?: string;
  title?: string;
  internal?: boolean;
}
