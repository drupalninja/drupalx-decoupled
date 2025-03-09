import { getImage } from "@/components/helpers/Utilities";
import Heading from "@/components/heading/Heading";
import { MediaImageType } from "@/graphql/fragments/media";

type NodeArticleComponentProps = {
  node: {
    title: string;
    subhead?: string;
    lead?: {
      value: string;
      processed?: string;
      format?: string;
    };
    media?: MediaImageType;
    body?: {
      value?: string;
      processed?: string;
      format?: string;
      summary?: string;
    };
  };
  environment: string;
}

export default function NodeArticleComponent({ node, environment }: NodeArticleComponentProps) {
  const { title, subhead, lead, media, body } = node;

  const bodyProcessed = body?.processed as string;
  const leadValue = lead?.value as string;
  const mediaImage = media ? media as MediaImageType : null;

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
            {leadValue && (
              <div className="prose prose-lg lead mb-4" dangerouslySetInnerHTML={{ __html: leadValue }} />
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
