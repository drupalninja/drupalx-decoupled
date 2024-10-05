import React from 'react';
import { FragmentOf, readFragment } from "gql.tada";
import { NodeArticleFragment } from "@/graphql/fragments/node";
import { getImage } from '@/components/helpers/Utilities';
import RecentCards from '@/components/recent-cards/RecentCards';

interface ViewRecentCardsProps {
  results: Array<FragmentOf<typeof NodeArticleFragment>>,
}

export default function ViewRecentCards({ results }: ViewRecentCardsProps) {
  const processedResults = results.map((result) => {
    const articleData = readFragment(NodeArticleFragment, result);
    const media = articleData.media ? getImage(articleData.media, 'w-full h-full object-cover', ['LARGE', 'I169LARGE2X']) : null;

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
