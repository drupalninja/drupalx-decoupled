import { FragmentOf, readFragment } from "gql.tada";
import { NodeArticleFragment } from "@/graphql/fragments/node";
import Card from '@/components/card/Card';
import { TextSummaryFragment } from "@/graphql/fragments/misc";

interface RecentCardsProps {
  results: Array<FragmentOf<typeof NodeArticleFragment>>,
}

export default function RecentCards({ results }: RecentCardsProps) {
  return (
    <div className='container'>
      <div className={`row`}>
        {results.map((result) => {
          const articleData = readFragment(NodeArticleFragment, result);
          return (
            <div className="col-md-6 col-lg-4 mb-2 mb-md-8" key={articleData.id}>
              <Card
                modifier=""
                heading={{
                  title: articleData.title,
                  url: articleData.path,
                }}
                media={articleData.media}
                mediaLink={articleData.path}
                summaryText={articleData?.summary as string}
              />
            </div>
          );
        })}
      </div>    
    </div>
  );
}