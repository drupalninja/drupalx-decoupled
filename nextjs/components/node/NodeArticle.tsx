import { getImage } from "@/components/helpers/Utilities";
import Heading from "@/components/heading/Heading";
import { MediaImage, TextFormat } from "@/lib/types";

type NodeArticleComponentProps = {
  node: {
    title: string;
    subhead?: string;
    lead?: TextFormat;
    media?: MediaImage;
    body?: TextFormat;
  };
  environment: string;
}

export default function NodeArticleComponent({ node }: NodeArticleComponentProps) {
  const { title, subhead, lead, media, body } = node;

  const bodyProcessed = body?.processed as string;
  const leadValue = lead?.value as string;
  const mediaImage = media ? media as MediaImage : null;

  let articleImage = null;
  if (mediaImage?.image) {
    articleImage = getImage(mediaImage, 'w-full h-full object-cover', ['LARGE', 'I169LARGE2X']);
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
