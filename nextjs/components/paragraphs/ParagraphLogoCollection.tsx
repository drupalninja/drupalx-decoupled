import React from 'react';
import { FragmentOf, readFragment, graphql } from 'gql.tada';
import { DateTimeFragment, LanguageFragment } from '@/graphql/fragments/misc';
import { MediaUnionFragment, MediaImageFragment, ImageFragment } from '@/graphql/fragments/media';
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

  const logos: Logo[] = mediaItem ? (mediaItem as FragmentOf<typeof MediaUnionFragment>[]).map((media, index) => {
    const mediaFragment = readFragment(MediaUnionFragment, media);
    const mediaImage = mediaFragment && mediaFragment.__typename === 'MediaImage'
      ? readFragment(MediaImageFragment, mediaFragment)
      : null;
    const imageFragment = mediaImage?.image && readFragment(ImageFragment, mediaImage.image);

    return {
      name: `Logo ${index + 1}`,
      media: imageFragment && getImage({
        image: {
          url: imageFragment.url,
          alt: imageFragment.alt ?? undefined,
          width: imageFragment.width,
          height: imageFragment.height,
          variations: imageFragment.variations ?? undefined
        }
      }, '', 'MEDIUM')
    };
  }) : [];

  return (
    <LogoCollection
      title={logo_collectionTitle}
      logos={logos}
    />
  );
}
