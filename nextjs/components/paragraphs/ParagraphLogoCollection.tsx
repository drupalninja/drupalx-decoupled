import React from 'react';
import { FragmentOf, readFragment, graphql } from 'gql.tada';
import { DateTimeFragment, LanguageFragment } from '@/graphql/fragments/misc';
import { MediaUnionFragment } from '@/graphql/fragments/media';
import { getImage } from '@/components/helpers/Utilities';

interface MediaImageType {
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
    logoCollectionTitle: title
  }
`, [DateTimeFragment, LanguageFragment, MediaUnionFragment]);

interface ParagraphLogoCollectionProps {
  paragraph: FragmentOf<typeof ParagraphLogoCollectionFragment>;
  modifier?: string;
}

export default function ParagraphLogoCollection({ paragraph, modifier }: ParagraphLogoCollectionProps) {
  const { mediaItem, logoCollectionTitle } = readFragment(ParagraphLogoCollectionFragment, paragraph);

  return (
    <div className={`container mx-auto px-4 ${modifier ?? 'my-6 lg:my-25'}`}>
      {logoCollectionTitle && (
        <h2 className="text-3xl font-bold text-center mb-6">{logoCollectionTitle}</h2>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
        {(mediaItem as any[]).map((item, index) => {
          const mediaFragment = readFragment(MediaUnionFragment, item);
          const mediaImage = mediaFragment ? mediaFragment as MediaImageType : null;

          const image = mediaImage?.image && getImage({
            image: {
              url: mediaImage.image.url,
              alt: mediaImage.image.alt ?? undefined,
              width: mediaImage.image.width,
              height: mediaImage.image.height,
              variations: mediaImage.image.variations?.map(({ name, url, width, height }) => ({
                name, url, width, height
              }))
            }
          }, 'w-full h-auto object-contain', ['MEDIUM', 'LARGE']);

          return (
            <div key={index} className="flex items-center justify-center p-4">
              {image}
            </div>
          );
        })}
      </div>
    </div>
  );
}
