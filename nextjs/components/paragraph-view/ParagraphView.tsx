import { FragmentOf, readFragment } from 'gql.tada';
import { ParagraphViewFragment } from '@/graphql/fragments/paragraph';
import RecentCards from './views/RecentCards';
import './ParagraphView.scss';

interface ParagraphViewProps {
  paragraph: FragmentOf<typeof ParagraphViewFragment>,
}

export default async function ParagraphView({ paragraph }: ParagraphViewProps) {
  const { viewsRef: { view, display, results } } = readFragment(ParagraphViewFragment, paragraph);

  return (
    <div className={`paragraph-view`}>
      {view === 'recent_cards' && display === 'article_cards' && (
        <RecentCards results={results} />
      )}
    </div>
  );
}
