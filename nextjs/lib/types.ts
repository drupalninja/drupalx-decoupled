export interface MediaImageType {
  __typename?: string;
  id?: string;
  image: {
    url: string;
    alt?: string;
    width?: number;
    height?: number;
    variations?: Array<{
      name: string;
      url: string;
      width?: number;
      height?: number;
    }>;
  };
}
