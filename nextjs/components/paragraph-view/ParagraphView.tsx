import { FragmentOf, readFragment } from 'gql.tada';
import { ParagraphViewFragment } from '@/graphql/fragments/paragraph';
import RecentCards from './views/RecentCards';
import { Card, CardContent } from "@/components/ui/card";

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
