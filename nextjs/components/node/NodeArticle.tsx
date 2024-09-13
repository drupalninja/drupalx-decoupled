import { FragmentOf, readFragment } from "gql.tada";
import { NodeArticleFragment } from "@/graphql/fragments/node";
import { getImage } from "../helpers/Utilities";
import Heading from "../heading/Heading";
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
      <article className="mb-6 lg:mb-12">
        <div className="container mx-auto px-4">
          {mediaFragment && (
            <div className="mb-7">
              {getImage(mediaFragment, 'w-full h-auto', ['HEROS', 'HEROLX2'])}
            </div>
          )}
          <div className="max-w-screen-lg mx-auto mb-2 lg:mb-10">
            {subhead && (
              <div className="uppercase mb-2 text-sm tracking-wide">
                {subhead}
              </div>
            )}
            <Heading level={1} title={title} className="mb-8" />
            {leadFragment?.value && (
              <div className="prose prose-lg lead mb-4 max-w-screen-lg mx-auto" dangerouslySetInnerHTML={{ __html: leadFragment.value }} />
            )}
          </div>
          {bodyProcessed && (
            <div
              className="prose prose-lg max-w-screen-md mx-auto"
              dangerouslySetInnerHTML={{ __html: bodyProcessed }}
            />
          )}
        </div>
      </article>
    </>
  );
}
