import React from 'react';
import { DateTimeFragment, LanguageFragment } from '@/graphql/fragments/misc';
import { MediaUnionFragment } from '@/graphql/fragments/media';
import { getImage } from '@/components/helpers/Utilities';
import LogoCollection, { Logo } from '../logo-collection/LogoCollection';

export const ParagraphLogoCollectionFragment = /* GraphQL */ `
  fragment ParagraphLogoCollectionFragment on ParagraphLogoCollection {
    id
    created {
      ...DateTimeFragment
    }
    langcode {
      ...LanguageFragment
    }
    mediaItem {
      ...MediaUnionFragment
    }
    status
    logo_collectionTitle: title
  }
`;

interface ParagraphLogoCollectionProps {
  paragraph: {
    id: string;
    mediaItem?: any[];
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
