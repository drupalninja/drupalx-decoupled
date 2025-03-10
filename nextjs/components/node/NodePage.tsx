import { getImage } from "@/components/helpers/Utilities";
import { MediaImage, TextFormat } from "@/lib/types";
import Heading from "@/components/heading/Heading";

type NodePageComponentProps = {
  node: {
    title: string;
    mediaPage?: MediaImage;
    body?: TextFormat;
  };
  environment: string;
};

export default function NodePageComponent({ node }: NodePageComponentProps) {
  const { title, mediaPage: media, body } = node;

  const mediaImage = media ? media as MediaImage : null;
  const bodyProcessed = body?.processed as string;

  let pageImage = null;

  if (mediaImage?.image) {
    pageImage = getImage(mediaImage, 'w-full h-full object-cover', ['LARGE', 'I169LARGE2X']);
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
          <Heading level={1} title={title} className="mb-8" />
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
