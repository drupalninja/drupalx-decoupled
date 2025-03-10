import { ReactNode } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { MediaImage } from '@/lib/types';

interface QuoteProps {
  author?: string;
  jobTitle?: string;
  logo?: ReactNode;
  quote: string;
  thumb?: MediaImage;
  containerClassName?: string;
}

const AvatarComponent: React.FC<{ thumb: QuoteProps['thumb']; author?: string }> = ({ thumb, author }) => {
  return (
    <Avatar className="w-16 h-16 mb-2 mx-auto">
      {thumb?.image?.url && <AvatarImage src={thumb.image.url} alt={author || 'Quote author'} />}
    </Avatar>
  );
};

export default function Quote({ author, jobTitle, logo, quote, thumb, containerClassName }: QuoteProps) {
  return (
    <div className={`container mx-auto ${containerClassName ?? 'my-6 lg:my-25'}`}>
      <div className="flex justify-center">
        <Card className="quote-card w-full lg:w-4/5 xl:w-2/3 border-0 shadow-none">
          <CardContent className="quote-content pt-6">
            {logo && (
              <div className="text-center mb-4">
                {logo}
              </div>
            )}
            <blockquote className="text-center mb-4">
              <p className="text-3xl font-normal">{quote}</p>
            </blockquote>
            <div className="text-center">
              <div className="inline-block">
                {thumb && <AvatarComponent thumb={thumb} author={author} />}
                {author && <div className="font-bold">{author}</div>}
                {jobTitle && <p className="text-sm text-muted-foreground">{jobTitle}</p>}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
