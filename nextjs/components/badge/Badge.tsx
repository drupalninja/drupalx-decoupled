import React from 'react';
import { Badge } from "@/components/ui/badge"

interface BadgeProps {
  tag: string;
  modifier?: string;
}

const BadgeComponent: React.FC<BadgeProps> = ({ tag, modifier }) => {
  return (
    <Badge variant="secondary" className={`rounded-full text-xs px-2 py-1 font-semibold${modifier ? ` ${modifier}` : ''}`}>
      {tag}
    </Badge>
  );
};

export default BadgeComponent;
