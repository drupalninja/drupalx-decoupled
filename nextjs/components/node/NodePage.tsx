import React from 'react';
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

interface MediaImageType {
  image: {
    url: string;
    alt?: string;
    width?: number;
    height?: number;
    variations?: Array<{
      name: string;
      url: string;
      width?: number;
      height?: number;
    }>;
  };
}

export default function NodePageComponent({
  node,
  environment,
}: NodePageComponentProps) {
  const { title, mediaPage, body } = readFragment(NodePageFragment, node);

  const mediaFragment = readFragment(MediaUnionFragment, mediaPage);
  const bodyFragment = readFragment(TextSummaryFragment, body);
  const bodyProcessed = bodyFragment?.processed as string;

  let pageImage = null;
  const mediaImage = mediaFragment ? mediaFragment as MediaImageType : null;
  if (mediaImage?.image) {
    pageImage = getImage({
      image: {
        url: mediaImage.image.url,
        alt: mediaImage.image.alt ?? undefined,
        width: mediaImage.image.width,
        height: mediaImage.image.height,
        variations: mediaImage.image.variations?.map(({ name, url, width, height }) => ({
          name, url, width, height
        }))
      }
    }, "w-full h-full object-cover", ["LARGE", "I169LARGE2X"]);
  }

  return (
    <article className="mb-8">
      <div className="mx-auto max-w-7xl p-4 sm:px-6 lg:px-8">
        {pageImage && (
          <div className="relative aspect-[16/9] mb-6">
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
