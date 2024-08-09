import { FragmentOf, readFragment } from "gql.tada";
import { NodeArticleFragment } from "@/graphql/fragments/node";
import { getImage } from "../helpers/Utilities";
import Heading from "../heading/Heading";
import './Node.scss';
import { TextSummaryFragment, TextFragment } from "@/graphql/fragments/misc";
import { MediaUnionFragment } from "@/graphql/fragments/media";

type NodeArticleComponentProps = {
  node: FragmentOf<typeof NodeArticleFragment>;
  environment: string;
}

export default function NodeArticleComponent({ node, environment }: NodeArticleComponentProps) {
  const { title, subhead, lead, media, body } = readFragment(
    NodeArticleFragment,
    node
  );

  const bodyFragment = readFragment(TextSummaryFragment, body);
  const bodyProcessed = bodyFragment?.processed as string;
  const leadFragment = readFragment(TextFragment, lead);
  const mediaFragment = readFragment(MediaUnionFragment, media);

  return (
    <>
      <article className="mb-6 mb-lg-12">
        <div className="container">
          {mediaFragment && (
            <div className="mb-7">
              {getImage(mediaFragment, 'img-fluid rounded shadow', ['HEROS', 'HEROLX2'])}
            </div>
          )}
          <div className="col-lg-10 col-xl-8 mx-auto mb-2 mb-lg-10">
            {subhead && (<div className="text-uppercase mb-2 fs-7">
              {subhead}
            </div>)}
            <Heading level={1} title={title} modifier="heading mb-2 display-3" />
            {leadFragment?.value && (<div className="lead mb-4" dangerouslySetInnerHTML={{ __html: leadFragment.value }} />)}
          </div>
          {bodyProcessed && (
            <div 
              className="col-lg-10 col-xl-7 mx-auto" 
              dangerouslySetInnerHTML={{ __html: bodyProcessed }} 
            />
          )}
        </div>
      </article>
    </>
  );
}
