import { FragmentOf, readFragment } from 'gql.tada';
import { TextFragment, LinkFragment } from "@/graphql/fragments/misc";
import { ParagraphSidebysideFragment } from "@/graphql/fragments/paragraph";
import { getImage } from '../helpers/Utilities';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ParagraphSidebysideProps {
  paragraph: FragmentOf<typeof ParagraphSidebysideFragment>,
  modifier?: string,
}

export default function ParagraphSidebyside({ paragraph, modifier }: ParagraphSidebysideProps) {
  const { eyebrow, sidebysideLayout: layout, sidebysideSummary, sidebysideTitle, link, media } = readFragment(ParagraphSidebysideFragment, paragraph);
  const linkFragment = readFragment(LinkFragment, link);
  const textFragment = readFragment(TextFragment, sidebysideSummary);

  return (
    <div className={`flex flex-col lg:flex-row items-center justify-between gap-6 ${modifier ?? 'container my-6 lg:my-15'} ${layout === 'right' ? 'lg:flex-row-reverse' : ''}`}>
      <div className="w-full lg:w-1/2">
        {getImage(media, 'w-full h-auto', ['I43SMALL', 'I43LARGE2X'])}
      </div>
      <div className="w-full lg:w-1/2 xl:w-5/12 flex flex-col gap-4">
        {eyebrow && (
          <div className="flex">
            <Badge variant="secondary" className="uppercase inline-flex">
              {eyebrow}
            </Badge>
          </div>
        )}
        <h2 className="text-2xl font-bold">{sidebysideTitle}</h2>
        {textFragment && (
          <div
            className="mb-3"
            dangerouslySetInnerHTML={{ __html: textFragment?.value ?? '' }}
          />
        )}
        {linkFragment?.url && (
          <div className="flex">
            <Button variant="default" asChild>
              <a href={linkFragment.url}>
                {linkFragment?.title ?? 'Read more'}
              </a>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
