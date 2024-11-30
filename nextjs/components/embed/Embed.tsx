import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface EmbedProps {
  title?: string,
  content: string,
  modifier?: string,
}

export default function Embed({ title, content, modifier }: EmbedProps) {
  return (
    <div className="container mx-auto px-4">
      <Card className={`border-none shadow-none ${modifier ?? 'my-6 lg:my-25'}`}>
        {title && (
          <CardHeader className='text-3xl'>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
        )}
        <CardContent>
          <div
            className="prose max-w-none [&_iframe]:w-full [&_iframe]:max-w-full"
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
        </CardContent>
      </Card>
    </div>
  );
}
