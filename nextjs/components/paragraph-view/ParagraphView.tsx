import { FragmentOf, readFragment } from 'gql.tada';
import { ParagraphViewFragment } from '@/graphql/fragments/paragraph';
import RecentCards from './views/RecentCards';
import Heading from '../heading/Heading';
import './ParagraphView.scss';

interface ParagraphViewProps {
  paragraph: FragmentOf<typeof ParagraphViewFragment>,
}

export default async function ParagraphView({ paragraph }: ParagraphViewProps) {
  const { viewsRef: { view, display, results }, title } = readFragment(ParagraphViewFragment, paragraph);

  return (
    <div className={`paragraph-view my-6 my-lg-15`}>
      {title && <Heading level={2} title={title} modifier='heading mb-4 mb-lg-6 text-center'/>}
      {view === 'recent_cards' && display === 'article_cards' && (
        <RecentCards results={results} />
      )}
    </div>
  );
}
