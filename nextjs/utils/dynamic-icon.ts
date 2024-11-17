import * as Icons from 'lucide-react';

export const getLucideIcon = (iconName: string) => {
  if (!iconName) return null;
  const iconKey = iconName
    .split(/[-_ ]+/)
    .map((str) => str.charAt(0).toUpperCase() + str.slice(1))
    .join('');
  return Icons[iconKey as keyof typeof Icons] || null;
};
