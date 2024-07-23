import { FragmentOf, readFragment } from "gql.tada";
import { NodeArticleFragment } from "@/graphql/fragments/node";
import { getImage } from "../helpers/Utilities";
import Heading from "../heading/Heading";

type NodeArticleComponentProps = {
  node: FragmentOf<typeof NodeArticleFragment>;
  environment: string;
}

export default function NodeArticleComponent({ node, environment }: NodeArticleComponentProps) {
  const { title, subhead, lead, path, media, summary } = readFragment(
    NodeArticleFragment,
    node
  );

  return (
    <>
      <article className="mb-6 mb-lg-12">
        <div className="container">
          {media?.image && (<div className="mb-7 rounded shadow">
            {getImage(media, 'img-fluid', 'HERO_L_X2')}
          </div>)}
          <div className="col-lg-10 col-xl-8 mx-auto mb-2 mb-lg-10">
            {subhead && (<div className="text-dark text-uppercase mb-2 fs-7">
              {subhead}
            </div>)}
            <Heading level={1} title={title} modifier="heading mb-2 text-secondary display-3" />
          </div>
        </div>
      </article>
    </>
  );
}
