import React from 'react';
import { Card, CardContent, CardTitle } from "@/components/ui/card";

export interface StatCardProps {
  type: 'stat';
  media?: React.ReactNode;
  heading: string;
  body?: string;
  icon?: string;
  border?: boolean;
  modifier?: string;
  layout?: 'left' | 'center';
}

const StatCard: React.FC<StatCardProps> = ({
  media,
  heading,
  body,
  icon,
  border = true,
  modifier = '',
  layout = 'center'
}) => {
  const alignmentClass = layout === 'left' ? 'text-left' : 'text-center';
  const iconClass = layout === 'left' ? 'mr-auto' : 'mx-auto';

  console.log(border);

  return (
    <Card className={`stat ${alignmentClass} ${!border ? 'border-0 shadow-none p-0' : ''} ${modifier}`}>
      <CardContent className={`pt-6 ${!border ? 'p-0' : ''}`}>
        {icon && (
          <div className={`stat-icon ${iconClass} mb-4 max-w-[200px]`}>
            <span className="material-symbols-outlined !text-6xl">{icon}</span>
          </div>
        )}
        {media && (
          <div className={`stat-icon ${iconClass} mb-4 max-w-[200px]`}>
            {media}
          </div>
        )}
        <CardTitle className="mb-2">{heading}</CardTitle>
        {body && <p className="mb-0 text-gray-600">{body}</p>}
      </CardContent>
    </Card>
  );
};

export default StatCard;
