import React from 'react';
import { FragmentOf, readFragment } from 'gql.tada';
import { ParagraphHeroFragment } from '@/graphql/fragments/paragraph';
import { getImage } from '../helpers/Utilities';
import { TextFragment, LinkFragment } from '@/graphql/fragments/misc';
import { Button } from "@/components/ui/button";
import './ParagraphHero.scss';

interface ParagraphHeroProps {
  paragraph: FragmentOf<typeof ParagraphHeroFragment>
  modifier?: string
}

export default function ParagraphHero({ paragraph, modifier }: ParagraphHeroProps) {
  const { requiredMedia, heroLayout, heading, summary, link } = readFragment(ParagraphHeroFragment, paragraph);
  const summaryFragment = readFragment(TextFragment, summary);
  const linkFragment = readFragment(LinkFragment, link);
  const headingFragment = readFragment(TextFragment, heading);

  return (
    <div className={`hero container mx-auto px-4 ${modifier || ''}`}>
      <div className={`mb-6 lg:mb-12 text-center ${modifier || ''}`}>
        {heroLayout === 'image_top' && requiredMedia && (
          <div className="mb-4 lg:mb-8 flex justify-center items-center">
            {getImage(requiredMedia, 'max-w-full h-auto', ['HEROS', 'HEROLX2'])}
          </div>
        )}

        {headingFragment && (
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-semibold mb-4 lg:mb-4" dangerouslySetInnerHTML={{ __html: headingFragment?.value ?? '' }} />
          </div>
        )}

        <div className="max-w-3xl mx-auto">
          {summaryFragment && (
            <div className="text-xl mb-2 lg:mb-4" dangerouslySetInnerHTML={{ __html: summaryFragment?.value ?? '' }} />
          )}

          {(linkFragment?.url && linkFragment?.title) && (
            <div className="flex justify-center mt-4">
              {link && (
                <Button
                  variant="default"
                  className='hero-button'
                  asChild
                >
                  <a href={linkFragment.url}>{linkFragment.title}</a>
                </Button>
              )}
            </div>
          )}
        </div>

        {heroLayout === 'image_bottom' && requiredMedia && (
          <div className="mt-6 flex justify-center items-center">
            {getImage(requiredMedia, 'max-w-full h-auto', ['HEROS', 'HEROLX2'])}
          </div>
        )}
      </div>
    </div>
  );
}
