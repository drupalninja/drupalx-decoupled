import { getImage } from '@/components/helpers/Utilities';
import RecentCards from '@/components/recent-cards/RecentCards';
import { MediaImageType } from "@/lib/types";

interface ViewRecentCardsProps {
  results: Array<{
    id: string;
    path: string;
    title: string;
    media?: MediaImageType | null;
    summary?: string;
  }>;
}

export default function ViewRecentCards({ results }: ViewRecentCardsProps) {
  const processedResults = results.map((result) => {
    const mediaUnion = result.media || null;

    let media = null;
    if (mediaUnion) {
      const mediaImage = mediaUnion as MediaImageType;
      if (mediaImage.image) {
        media = getImage({
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
    }

    return {
      id: result.id,
      path: result.path,
      title: result.title,
      summary: result.summary as string,
      media: media,
    };
  });

  return <RecentCards results={processedResults} />;
}
