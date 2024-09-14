import { FragmentOf, readFragment, graphql } from 'gql.tada';
import { TextFragment, DateTimeFragment, LanguageFragment, LinkFragment } from "@/graphql/fragments/misc";
import { MediaUnionFragment } from "@/graphql/fragments/media";
import RecentCards from '@/components/views/ViewRecentCards';
import { Card, CardContent } from "@/components/ui/card";

export const ParagraphViewFragment = graphql(`fragment ParagraphViewFragment on ParagraphView {
  id
  created {
    ...DateTimeFragment
  }
  langcode {
    ...LanguageFragment
  }
  link {
    ...LinkFragment
  }
  status
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
}`,
  [
    MediaUnionFragment,
    DateTimeFragment,
    LanguageFragment,
    LinkFragment,
    TextFragment,
  ]
)

interface ParagraphViewProps {
  paragraph: FragmentOf<typeof ParagraphViewFragment>,
}

export default async function ParagraphView({ paragraph }: ParagraphViewProps) {
  const { viewsRef: { view, display, results }, title } = readFragment(ParagraphViewFragment, paragraph);

  return (
    <Card className="my-6 lg:my-15 border-none shadow-none">
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
