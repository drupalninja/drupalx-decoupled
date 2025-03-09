import { Button } from "@/components/ui/button";
import './Hero.scss';
import { TextFormat, LinkFormat } from "@/lib/types";

export interface HeroProps {
  heroLayout?: 'image_top' | 'image_bottom' | 'image_bottom_split';
  media?: React.ReactNode;
  heading?: TextFormat;
  summary?: TextFormat;
  link?: LinkFormat;
  link2?: LinkFormat;
  modifier?: string;
}

export default function Hero({ heroLayout, media, heading, summary, link, link2, modifier }: HeroProps) {

  if (heroLayout === 'image_bottom_split') {
    return (
      <div className={`hero mt-6 lg:mt-12 mx-auto ${modifier || ''}`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between">
            <div className="lg:w-1/2 mb-2 lg:mb-0">
              {heading && (
                <h1 className="text-4xl lg:text-5xl font-semibold mb-4 lg:mb-4" dangerouslySetInnerHTML={{ __html: heading.processed ?? '' }} />
              )}
            </div>
            <div className="lg:w-1/2">
              {summary && (
                <div className="text-xl mb-4" dangerouslySetInnerHTML={{ __html: summary.processed ?? '' }} />
              )}
              <div className="flex items-center space-x-4 mt-6">
                {(link?.url && link?.title) && (
                  <Button variant="default" className='hero-button' asChild>
                    <a href={link.url}>{link.title}</a>
                  </Button>
                )}
                {(link2?.url && link2?.title) && (
                  <Button variant="outline" className='hero-button' asChild>
                    <a href={link2.url}>{link2.title}</a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
        {media && (
          <div className="mt-6 lg:mt-12 flex justify-center items-center">
            {media}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`hero mx-auto ${modifier || ''}`}>
      <div className={`mb-6 lg:mb-12 text-center ${modifier || ''}`}>
        {heroLayout === 'image_top' && media && (
          <div className="mb-4 lg:mb-8 flex justify-center items-center">
            {media}
          </div>
        )}

        {heading && (
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-semibold mb-4 lg:mb-4" dangerouslySetInnerHTML={{ __html: heading.processed ?? '' }} />
          </div>
        )}

        <div className="max-w-3xl mx-auto">
          {summary && (
            <div className="text-xl mb-2 lg:mb-4" dangerouslySetInnerHTML={{ __html: summary.processed ?? '' }} />
          )}

          <div className="flex justify-center items-center space-x-4 mt-6">
            {(link?.url && link?.title) && (
              <Button variant="default" className='hero-button' asChild>
                <a href={link.url}>{link.title}</a>
              </Button>
            )}

            {(link2?.url && link2?.title) && (
              <Button variant="outline" className='hero-button' asChild>
                <a href={link2.url}>{link2.title}</a>
              </Button>
            )}
          </div>
        </div>

        {heroLayout === 'image_bottom' && media && (
          <div className="mt-6 lg:mt-12 flex justify-center items-center">
            {media}
          </div>
        )}
      </div>
    </div>
  );
}
