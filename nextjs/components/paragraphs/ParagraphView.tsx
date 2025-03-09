import RecentCards from '@/components/views/ViewRecentCards';
import { Card, CardContent } from "@/components/ui/card";

export const ParagraphViewFragment = /* GraphQL */ `
  fragment ParagraphViewFragment on ParagraphView {
    link {
      ...LinkFragment
    }
    title
    viewsRef {
      __typename
      ... on RecentCardsArticleCardsResult {
        id
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
            created {
              ...DateTimeFragment
            }
            langcode {
              ...LanguageFragment
            }
            status
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
        id: string;
        path?: string;
        title?: string;
        media?: any;
        created?: any;
        langcode?: any;
        status?: boolean;
        summary?: string;
      }>;
    };
  };
}

export default async function ParagraphView({ paragraph }: ParagraphViewProps) {
  const { viewsRef, title } = paragraph;
  const { view, display, results } = viewsRef || {};

  return (
    <Card className="my-6 lg:my-25 border-none shadow-none">
      <CardContent>
        {title && (
          <h2 className="text-3xl font-semibold mb-4 lg:mb-6 text-center">{title}</h2>
        )}
        {view === 'recent_cards' && display === 'article_cards' && (
          <RecentCards results={results as any} />
        )}
      </CardContent>
    </Card>
  );
}
