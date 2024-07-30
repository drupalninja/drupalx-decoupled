import { FragmentOf, readFragment } from "gql.tada";
import { NodePageFragment } from "@/graphql/fragments/node";
import { getImage } from "../helpers/Utilities";
import { MediaUnionFragment } from "@/graphql/fragments/media";
import Heading from "../heading/Heading";
import { TextSummaryFragment } from "@/graphql/fragments/misc";
import './Node.scss';

type NodePageComponentProps = {
  node: FragmentOf<typeof NodePageFragment>;
  environment: string;
}

export default function NodePageComponent({ node, environment }: NodePageComponentProps) {
  const { title, mediaPage, body } = readFragment(
    NodePageFragment,
    node
  );

  const mediaFragment = readFragment(MediaUnionFragment, mediaPage);
  const bodyFragment = readFragment(TextSummaryFragment, body);
  const bodyProcessed = bodyFragment?.processed as string;

  return (
    <>
      <article className="mb-6 mb-lg-12">
        <div className="container">
          {mediaFragment && (<div className="mb-7 rounded shadow">
            {getImage(mediaFragment, 'img-fluid', ['HEROS', 'HEROLX2'])}
          </div>)}
          <div className="col-lg-8 mx-auto">
            <Heading level={1} title={title} modifier="heading display-3 mb-6 text-center" />
            {bodyProcessed && (<div dangerouslySetInnerHTML={{ __html: bodyProcessed }} />)}
          </div>
        </div>
      </article>
    </>
  );
}
