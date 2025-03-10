import RecentCards from '@/components/views/ViewRecentCards';
import { Card, CardContent } from "@/components/ui/card";
import { MediaImage } from '@/lib/types';

export const ParagraphViewFragment = /* GraphQL */ `
  fragment ParagraphViewFragment on ParagraphView {
    link {
      ...LinkFragment
    }
    title
    viewsRef {
      __typename
      ... on RecentCardsArticleCardsResult {
        view
        display
        results {
          ... on NodeArticle {
            id
            path
            title
            media {
              ...MediaImageFragment
            }
            summary
          }
        }
      }
    }
  }
`;

interface ParagraphViewProps {
  paragraph: {
    title?: string;
    viewsRef?: {
      view?: string;
      display?: string;
      results?: Array<{
        id?: string;
        path?: string;
        title?: string;
        media?: MediaImage;
        summary?: string;
      }>;
    };
  };
}

export default async function ParagraphView({ paragraph }: ParagraphViewProps) {
  const { viewsRef, title } = paragraph;
  const { view, display, results } = viewsRef || {};

  // Ensure each result has a unique id
  const processedResults = results?.map((result, index) => {
    if (!result) return null;

    return {
      ...result,
      id: result.id || `recent-card-${index}`,
    };
  }).filter(Boolean) || [];

  return (
    <Card className="my-6 lg:my-25 border-none shadow-none">
      <CardContent>
        {title && (
          <h2 className="text-3xl font-semibold mb-4 lg:mb-6 text-center">{title}</h2>
        )}
        {view === 'recent_cards' && display === 'article_cards' && (
          <RecentCards results={processedResults as any} />
        )}
      </CardContent>
    </Card>
  );
}
