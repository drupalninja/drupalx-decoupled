import { getImage } from '@/components/helpers/Utilities';
import { CustomCardProps } from '@/components/card-group/CardGroup';
import { LinkFormat, MediaImage } from '@/lib/types';

export const ParagraphCardFragment = /* GraphQL */ `
  fragment ParagraphCardFragment on ParagraphCard {
    link {
      ...LinkFragment
    }
    media {
      ...MediaUnionFragment
    }
    summary
    title
  }
`;

export interface ParagraphCardType {
  __typename: 'ParagraphCard';
  title?: string;
  summary?: string;
  link?: LinkFormat;
  media?: MediaImage | null;
  tags?: string[];
}

export function transformCard(item: ParagraphCardType): CustomCardProps {
  return {
    type: 'custom',
    media: item.media ? getImage(item.media, 'object-cover w-full h-full') : null,
    mediaLink: item.link?.url,
    heading: {
      title: item.title || '',
      url: item.link?.url,
    },
    tags: item.tags,
    summaryText: item.summary,
    link: item.link,
  };
}
