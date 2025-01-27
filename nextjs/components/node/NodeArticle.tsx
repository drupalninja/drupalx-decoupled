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
  const imageFragment = mediaImage?.image && readFragment(ImageFragment, mediaImage.image);
  const articleImage = imageFragment && getImage({
    image: {
      url: imageFragment.url,
      alt: imageFragment.alt ?? undefined,
      width: imageFragment.width,
      height: imageFragment.height,
      variations: imageFragment.variations?.map(({ name, url, width, height }) => ({
        name, url, width, height
      }))
    }
  }, 'w-full h-full object-cover', ['LARGE', 'I169LARGE2X']);

  return (
    <>
      <article className="node-article mb-8">
        {articleImage && (
          <div className="relative aspect-[16/9] mb-6">
            {articleImage}
          </div>
        )}
        <div className="container mx-auto px-4">
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
