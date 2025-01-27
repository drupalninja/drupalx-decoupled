import React from 'react';
import { FragmentOf, readFragment } from "gql.tada";
import { NodeArticleFragment } from "@/graphql/fragments/node";
import { getImage } from "@/components/helpers/Utilities";
import Heading from "@/components/heading/Heading";
import { TextSummaryFragment, TextFragment } from "@/graphql/fragments/misc";
import { MediaUnionFragment, MediaImageFragment, ImageFragment } from "@/graphql/fragments/media";


type NodeArticleComponentProps = {
  node: FragmentOf<typeof NodeArticleFragment>;
  environment: string;
}

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

export default function NodeArticleComponent({ node, environment }: NodeArticleComponentProps) {
  const { title, subhead, lead, media, body } = readFragment(
    NodeArticleFragment,
    node
  );

  const bodyFragment = readFragment(TextSummaryFragment, body);
  const bodyProcessed = bodyFragment?.processed as string;
  const leadFragment = readFragment(TextFragment, lead);
  const mediaFragment = readFragment(MediaUnionFragment, media);

  const mediaImage = mediaFragment ? mediaFragment as MediaImageType : null;
  let articleImage = null;
  if (mediaImage?.image) {
    articleImage = getImage({
      image: {
        url: mediaImage.image.url,
        alt: mediaImage.image.alt ?? undefined,
        width: mediaImage.image.width,
        height: mediaImage.image.height,
        variations: mediaImage.image.variations?.map(({ name, url, width, height }) => ({
          name, url, width, height
        }))
      }
    }, 'w-full h-full object-cover', ['LARGE', 'I169LARGE2X']);
  }

  return (
    <>
      <article className="mb-8">
        <div className="mx-auto max-w-7xl p-4 sm:px-6 lg:px-8">
          {articleImage && (
            <div className="relative aspect-[16/9] mb-6">
              {articleImage}
            </div>
          )}
          <div className="mx-auto max-w-2xl">
            {subhead && (
              <div className="uppercase mb-2 text-sm tracking-wide">
                {subhead}
              </div>
            )}
            <Heading level={1} title={title} className="mb-8" />
            {leadFragment?.value && (
              <div className="prose prose-lg lead mb-4" dangerouslySetInnerHTML={{ __html: leadFragment.value }} />
            )}
            {bodyProcessed && (
              <div
                className="prose prose-lg"
                dangerouslySetInnerHTML={{ __html: bodyProcessed }}
              />
            )}
          </div>
        </div>
      </article>
    </>
  );
}
