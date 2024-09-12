import { FragmentOf, readFragment } from "gql.tada";
import { NodePageFragment } from "@/graphql/fragments/node";
import { getImage } from "../helpers/Utilities";
import { MediaUnionFragment } from "@/graphql/fragments/media";
import Heading from "../heading/Heading";
import { TextSummaryFragment } from "@/graphql/fragments/misc";

type NodePageComponentProps = {
  node: FragmentOf<typeof NodePageFragment>;
  environment: string;
};

export default function NodePageComponent({
  node,
  environment,
}: NodePageComponentProps) {
  const { title, mediaPage, body } = readFragment(NodePageFragment, node);

  const mediaFragment = readFragment(MediaUnionFragment, mediaPage);
  const bodyFragment = readFragment(TextSummaryFragment, body);
  const bodyProcessed = bodyFragment?.processed as string;

  return (
    <article className="mb-8">
      <div className="mx-auto max-w-7xl p-4 sm:px-6 lg:px-8">
        {mediaFragment && (
          <div className="mb-7">
            {getImage(mediaFragment, "w-full h-auto", ["HEROS", "HEROLX2"])}
          </div>
        )}
        <div className="mx-auto max-w-2xl">
          <Heading
            level={1}
            title={title}
            className="mb-6 text-center"
          />
          {bodyProcessed && (
            <div
              className="prose prose-lg"
              dangerouslySetInnerHTML={{ __html: bodyProcessed }}
            />
          )}
        </div>
      </div>
    </article>
  );
}
