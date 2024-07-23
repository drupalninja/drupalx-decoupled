import { FragmentOf, readFragment } from "gql.tada";
import { NodeArticleFragment } from "@/graphql/fragments/node";
import Card from '@/components/card/Card';

interface RecentCardsProps {
  results: Array<FragmentOf<typeof NodeArticleFragment>>,
}

export default function RecentCards(
    {results}: RecentCardsProps
  ) {

  return (
    <div className="my-6 my-lg-15">
      <div className='container'>
        <div className={`row`}>
          {results.map((result) => (
            <div className="col-md-6 col-lg-4 mb-2 mb-md-8" key={result.id}>
              <Card
                modifier=""
                heading={{
                  title: result.title,
                  url: result.path,
                }}
                media={result.media}
                mediaLink={result.path}
                summaryText={result.summary}
              />
            </div>
          ))}
        </div>    
      </div>
    </div>
  )
}