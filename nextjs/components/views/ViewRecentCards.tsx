import React from 'react';
import { FragmentOf, readFragment } from 'gql.tada';
import { NodeArticleFragment } from "@/graphql/fragments/node";
import { getImage } from '@/components/helpers/Utilities';
import RecentCards from '@/components/recent-cards/RecentCards';
import { MediaUnionFragment, MediaImageType } from "@/graphql/fragments/media";

interface ViewRecentCardsProps {
  results: Array<FragmentOf<typeof NodeArticleFragment>>;
}

export default function ViewRecentCards({ results }: ViewRecentCardsProps) {
  const processedResults = results.map((result) => {
    const articleData = readFragment(NodeArticleFragment, result);
    const mediaUnion = articleData.media ? readFragment(MediaUnionFragment, articleData.media) : null;

    let media = null;
    if (mediaUnion) {
      const mediaImage = mediaUnion as MediaImageType;
      if (mediaImage.image) {
        media = getImage({
          image: {
            url: mediaImage.image.url,
            alt: mediaImage.image.alt ?? undefined,
            width: mediaImage.image.width,
            height: mediaImage.image.height,
            variations: mediaImage.image.variations?.map(({ name, url, width, height }) => ({
              name, url, width, height
            }))
          }
        }, 'w-full h-full object-cover', ['LARGE', 'I169LARGE2X']);
      }
    }

    return {
      id: articleData.id,
      path: articleData.path,
      title: articleData.title,
      summary: articleData.summary as string,
      media: media,
    };
  });

  return <RecentCards results={processedResults} />;
}
