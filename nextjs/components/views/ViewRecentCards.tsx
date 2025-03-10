import { getImage } from '@/components/helpers/Utilities';
import RecentCards from '@/components/recent-cards/RecentCards';
import { MediaImage } from "@/lib/types";

interface ViewRecentCardsProps {
  results: Array<{
    id: string;
    path: string;
    title: string;
    media?: MediaImage | null;
    summary?: string;
  }>;
}

export default function ViewRecentCards({ results }: ViewRecentCardsProps) {
  const processedResults = results.map((result) => {
    const mediaUnion = result.media || null;

    let media = null;
    if (mediaUnion) {
      const mediaImage = mediaUnion as MediaImage;
      if (mediaImage.image) {
        media = getImage(mediaImage, 'w-full h-full object-cover', ['LARGE', 'I169LARGE2X']);
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
