import React from 'react';
import { FragmentOf, readFragment } from "gql.tada";
import { ParagraphQuoteFragment } from "@/graphql/fragments/paragraph";
import { getImage } from "../helpers/Utilities";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

interface ParagraphQuoteProps {
  paragraph: FragmentOf<typeof ParagraphQuoteFragment>
  modifier?: string
}

export default function ParagraphQuote({ paragraph, modifier }: ParagraphQuoteProps) {
  const { author, jobTitle, logo, quote, thumb } = readFragment(ParagraphQuoteFragment, paragraph);

  return (
    <div className={`container mx-auto ${modifier ?? 'my-6 lg:my-15'}`}>
      <div className="flex justify-center">
        <Card className="w-full lg:w-4/5 xl:w-2/3 border-0 shadow-none">
          <CardContent className="pt-6">
            {logo && (
              <div className="text-center mb-4">
                <div className="w-1/3 mx-auto">
                  {getImage(logo, 'w-full h-auto', 'I11SMALL')}
                </div>
              </div>
            )}
            <blockquote className="text-center mb-4">
              <p className="text-3xl font-normal">{quote}</p>
            </blockquote>
            <div className="text-center">
              <div className="inline-block">
                <Avatar className="w-16 h-16 mb-2 mx-auto">
                  {thumb?.image?.url && <AvatarImage src={thumb.image.url} alt={author || 'Quote author'} />}
                </Avatar>
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
