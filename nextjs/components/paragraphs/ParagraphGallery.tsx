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
      <Gallery
        mediaItems={mediaItem}
        title={title}
        summary={gallerySummaryFragment?.value}
      />
    </div>
  );
}
