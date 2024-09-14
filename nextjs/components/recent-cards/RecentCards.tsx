import React, { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Link from 'next/link';

interface RecentCardProps {
  id: string;
  path: string;
  title: string;
  summary: string;
  media: ReactNode;
}

interface RecentCardsProps {
  results: RecentCardProps[];
}

export default function RecentCards({ results }: RecentCardsProps) {
  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
        {results.map((article) => (
          <Card key={article.id} className="overflow-hidden">
            <Link href={article.path}>
              <AspectRatio ratio={16 / 9}>
                {article.media}
              </AspectRatio>
            </Link>
            <CardHeader>
              <CardTitle className='text-3xl'>
                <Link href={article.path} className="hover:underline">
                  {article.title}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                {article.summary}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
