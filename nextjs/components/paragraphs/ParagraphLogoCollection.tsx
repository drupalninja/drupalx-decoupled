import { getImage } from '@/components/helpers/Utilities';
import LogoCollection, { Logo } from '../logo-collection/LogoCollection';
import { MediaImage } from '@/lib/types';

export const ParagraphLogoCollectionFragment = /* GraphQL */ `
  fragment ParagraphLogoCollectionFragment on ParagraphLogoCollection {
    mediaItem {
      ...MediaUnionFragment
    }
    logo_collectionTitle: title
  }
`;

interface ParagraphLogoCollectionProps {
  paragraph: {
    mediaItem?: MediaImage[];
    logo_collectionTitle?: string;
  };
}

export default function ParagraphLogoCollection({ paragraph }: ParagraphLogoCollectionProps) {
  const { mediaItem, logo_collectionTitle } = paragraph;

  // Extract logos from mediaItem
  const logos: Logo[] = mediaItem ? mediaItem.map((media, index) => ({
    name: `Logo ${index + 1}`,
    media: getImage(media, '', 'MEDIUM')
  })) : [];

  return (
    <LogoCollection
      title={logo_collectionTitle || ''}
      logos={logos}
    />
  );
}
