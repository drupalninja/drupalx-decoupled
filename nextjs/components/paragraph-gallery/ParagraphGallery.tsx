'use client'

import { FragmentOf, readFragment } from 'gql.tada';
import { ParagraphGalleryFragment } from '@/graphql/fragments/paragraph';
import { TextSummaryFragment } from '@/graphql/fragments/misc';
import Gallery from '@/components/gallery/Gallery';

interface ParagraphGalleryProps {
  paragraph: FragmentOf<typeof ParagraphGalleryFragment>
  modifier?: string
}

export default function ParagraphGallery({ paragraph, modifier }: ParagraphGalleryProps) {
  const { title, gallerySummary, mediaItem } = readFragment(ParagraphGalleryFragment, paragraph);
  const gallerySummaryFragment = readFragment(TextSummaryFragment, gallerySummary);

  return (
    <div className={modifier ?? 'container my-6 my-lg-15'}>
      {title && (
        <div className="mb-4 text-center">
          <h2 className="text-3xl font-bold">{title}</h2>
        </div>
      )}
      {gallerySummaryFragment && (
        <div className="flex justify-center mb-4">
          <div className="text-center pb-3 md:w-2/3">
            <div dangerouslySetInnerHTML={{ __html: gallerySummaryFragment?.value ?? '' }} />
          </div>
        </div>
      )}
      <Gallery mediaItems={mediaItem} />
    </div>
  );
}
