import { getImage } from '@/components/helpers/Utilities';
import { StatCardProps } from '@/components/stat-card/StatCard';
import { MediaImage } from '@/lib/types';

export const ParagraphStatsItemFragment = /* GraphQL */ `
  fragment ParagraphStatsItemFragment on ParagraphStatsItem {
    customIcon {
      ...SvgMediaFragment
    }
    icon
    statSummary: summary
    title
  }
`;

export interface ParagraphStatsItemType {
  __typename: 'ParagraphStatsItem';
  title?: string;
  statSummary?: string;
  icon?: string;
  customIcon?: MediaImage | null;
}

export function transformStatsItem(item: ParagraphStatsItemType): StatCardProps {
  return {
    type: 'stat',
    icon: item.icon,
    media: item.customIcon ? getImage(item.customIcon, 'w-16 h-16 object-contain mx-auto') : null,
    heading: item.title || '',
    body: item.statSummary,
  };
}
