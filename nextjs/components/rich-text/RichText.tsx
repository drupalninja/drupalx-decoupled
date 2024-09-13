import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface RichTextProps {
  bodyText: string;
}

const RichText: React.FC<RichTextProps> = ({ bodyText }) => {
  return (
    <Card className="rich-text prose prose-lg border-none shadow-none">
      <CardContent>
        <div dangerouslySetInnerHTML={{ __html: bodyText }} />
      </CardContent>
    </Card>
  );
};

export default RichText;
