import { FragmentOf, readFragment } from "gql.tada";
import { NodePageFragment } from "@/graphql/fragments/node";
import { getImage } from "../helpers/Utilities";
import Heading from "../heading/Heading";
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

  return (
    <>
      <article className="mb-6 mb-lg-12">
        <div className="container">
          {mediaPage?.image && (<div className="mb-7 rounded shadow">
            {getImage(mediaPage, 'img-fluid', 'HERO_L_X2')}
          </div>)}
          <div className="col-lg-8 mx-auto">
            <Heading level={1} title={title} modifier="heading display-3 mb-6 text-center" />
            {body?.processed && (<div dangerouslySetInnerHTML={{ __html: body.processed }} />)}
          </div>
        </div>
      </article>
    </>
  );
}
