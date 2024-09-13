import { FragmentOf, readFragment } from 'gql.tada';
import { TextFragment } from '@/graphql/fragments/misc';
import { ParagraphEmbedFragment } from '@/graphql/fragments/paragraph';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ParagraphEmbedProps {
  paragraph: FragmentOf<typeof ParagraphEmbedFragment>,
  className?: string,
}

export default function ParagraphEmbed({ paragraph, className }: ParagraphEmbedProps) {
  const { title, script } = readFragment(ParagraphEmbedFragment, paragraph);
  const scriptFragment = readFragment(TextFragment, script);

  return (
    <div className="container mx-auto px-4">
      <Card className={`my-6 lg:my-15 border-none shadow-none ${className ?? ''}`}>
        {title && (
          <CardHeader className='text-3xl'>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
        )}
        <CardContent>
          <div
            className="prose max-w-none [&_iframe]:w-full [&_iframe]:max-w-full"
            dangerouslySetInnerHTML={{ __html: scriptFragment?.value ?? '' }}
          ></div>
        </CardContent>
      </Card>
    </div>
  );
}
