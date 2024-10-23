import { FragmentOf, readFragment, graphql } from 'gql.tada';
import { TextSummaryFragment, DateTimeFragment, LanguageFragment } from '@/graphql/fragments/misc';
import { MediaUnionFragment } from '@/graphql/fragments/media';
import Gallery from '@/components/gallery/Gallery';
import { getImage } from '@/components/helpers/Utilities';

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

type MediaItem = FragmentOf<typeof MediaUnionFragment>;

interface ParagraphGalleryProps {
  paragraph: FragmentOf<typeof ParagraphGalleryFragment>
  modifier?: string
}

export default function ParagraphGallery({ paragraph, modifier }: ParagraphGalleryProps) {
  const { title, gallerySummary, mediaItem } = readFragment(ParagraphGalleryFragment, paragraph);
  const gallerySummaryFragment = readFragment(TextSummaryFragment, gallerySummary);

  const mediaNodes = (mediaItem as MediaItem[]).map((item: any, index: number) => (
    getImage(item, 'w-full h-auto rounded-lg', ['I43SMALL', 'I43LARGE2X'])
  ));

  return (
    <div className={modifier ?? 'container my-6 my-lg-15'}>
      <Gallery
        mediaItems={mediaNodes}
        title={title ?? ''}
        summary={gallerySummaryFragment?.value ?? ''}
      />
    </div>
  );
}
