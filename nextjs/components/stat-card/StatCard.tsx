import React from 'react';
import { Card, CardContent, CardTitle } from "@/components/ui/card";

export interface StatCardProps {
  type: 'stat';
  media?: React.ReactNode;
  heading: string;
  body?: string;
  modifier?: string;
}

const StatCard: React.FC<StatCardProps> = ({ media, heading, body, modifier = '' }) => (
  <Card className={`stat text-center ${modifier}`}>
    <CardContent className="pt-6">
      {media && (
        <div className="stat-icon mx-auto mb-4 max-w-[200px]">
          {media}
        </div>
      )}
      <CardTitle className="mb-2">{heading}</CardTitle>
      {body && <p className="mb-0 text-gray-600">{body}</p>}
    </CardContent>
  </Card>
);

export default StatCard;
