import { FragmentOf, readFragment, graphql } from 'gql.tada';
import { TextSummaryFragment, DateTimeFragment, LanguageFragment } from '@/graphql/fragments/misc';
import { MediaUnionFragment } from '@/graphql/fragments/media';
import Gallery from '@/components/gallery/Gallery';

export const ParagraphGalleryFragment = graphql(`fragment ParagraphGalleryFragment on ParagraphGallery {
  id
  gallerySummary: body {
    ...TextSummaryFragment
  }
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
  title
}`,
  [
    TextSummaryFragment,
    DateTimeFragment,
    LanguageFragment,
    MediaUnionFragment,
  ]
)
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
