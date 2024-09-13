import React from 'react';
import { FragmentOf, readFragment } from "gql.tada";
import { NodeArticleFragment } from "@/graphql/fragments/node";
import { getImage } from '../../helpers/Utilities';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Link from 'next/link';

interface RecentCardsProps {
  results: Array<FragmentOf<typeof NodeArticleFragment>>,
}

export default function RecentCards({ results }: RecentCardsProps) {
  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
        {results.map((result) => {
          const articleData = readFragment(NodeArticleFragment, result);
          return (
            <Card key={articleData.id} className="overflow-hidden">
              <Link href={articleData.path}>
                <AspectRatio ratio={16 / 9}>
                  {articleData.media && (
                    getImage(articleData.media, '', ['LARGE', 'I169LARGE2X'])
                  )}
                </AspectRatio>
              </Link>
              <CardHeader>
                <CardTitle className='text-3xl'>
                  <Link href={articleData.path} className="hover:underline">
                    {articleData.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  {articleData?.summary as string}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
