import { BulletProps } from '@/components/sidebyside/Sidebyside';
import { TextFormat } from '@/lib/types';

export const ParagraphBulletFragment = /* GraphQL */ `
  fragment ParagraphBulletFragment on ParagraphBullet {
    bulletIcon: icon
    bulletSummary: summary {
      ...TextFragment
    }
  }
`;

export interface ParagraphBulletType {
  __typename: 'ParagraphBullet';
  bulletIcon?: BulletProps['icon'];
  bulletSummary?: TextFormat;
}

export function transformBullet(bullet: ParagraphBulletType): BulletProps {
  return {
    type: 'bullet',
    icon: bullet.bulletIcon || '',
    summary: bullet.bulletSummary?.value || '',
  };
}
