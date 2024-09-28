import React from 'react';
import { FragmentOf, readFragment, graphql } from 'gql.tada';
import { DateTimeFragment, LanguageFragment } from '@/graphql/fragments/misc';
import { MediaUnionFragment } from '@/graphql/fragments/media';
import { getImage } from '@/components/helpers/Utilities';
import LogoCollection, { Logo } from '../logo-collection/LogoCollection';

export const ParagraphLogoCollectionFragment = graphql(`
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
`, [DateTimeFragment, LanguageFragment, MediaUnionFragment]);

interface ParagraphLogoCollectionProps {
  paragraph: FragmentOf<typeof ParagraphLogoCollectionFragment>;
}

export default function ParagraphLogoCollection({ paragraph }: ParagraphLogoCollectionProps) {
  const { mediaItem, logo_collectionTitle } = readFragment(ParagraphLogoCollectionFragment, paragraph);

  // Extract logos from mediaItem
  const logos: Logo[] = (mediaItem as any[]).map((media, index) => ({
    name: `Logo ${index + 1}`,
    media: getImage(media, '', 'I11SMALL')
  }));

  return (
    <LogoCollection
      title={logo_collectionTitle}
      logos={logos}
    />
  );
}
