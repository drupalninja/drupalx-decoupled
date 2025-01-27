import { FragmentOf, readFragment } from "gql.tada";
import { NodePageFragment } from "@/graphql/fragments/node";
import { getImage } from "@/components/helpers/Utilities";
import { MediaUnionFragment, MediaImageFragment, ImageFragment } from "@/graphql/fragments/media";
import Heading from "@/components/heading/Heading";
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

  const mediaImage = mediaFragment && mediaFragment.__typename === 'MediaImage'
    ? readFragment(MediaImageFragment, mediaFragment)
    : null;
  const imageFragment = mediaImage?.image && readFragment(ImageFragment, mediaImage.image);
  const pageImage = imageFragment && getImage({
    image: {
      url: imageFragment.url,
      alt: imageFragment.alt ?? undefined,
      width: imageFragment.width,
      height: imageFragment.height,
      variations: imageFragment.variations ?? undefined
    }
  }, "w-full h-auto", ["HEROS", "HEROLX2"]);

  return (
    <article className="mb-8">
      <div className="mx-auto max-w-7xl p-4 sm:px-6 lg:px-8">
        {pageImage && (
          <div className="mb-7">
            {pageImage}
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
