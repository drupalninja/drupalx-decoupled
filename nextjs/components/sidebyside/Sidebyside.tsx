import React, { ReactNode } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import StatCard, { StatCardProps } from '../stat-card/StatCard';
import { getLucideIcon } from '@/utils/dynamic-icon';

interface BulletProps {
  type: 'bullet';
  icon: string;
  summary: string;
}

type FeatureItem = StatCardProps | BulletProps;

export interface SidebysideProps {
  eyebrow?: string;
  layout?: string;
  title: string;
  summary?: string;
  link?: {
    url?: string;
    title?: string;
  };
  media: ReactNode;
  modifier?: string;
  features?: FeatureItem[];
}

const BulletFeature: React.FC<{ feature: BulletProps }> = ({ feature }) => {
  const IconComponent = getLucideIcon(feature.icon) as React.FC<{ size?: number; className?: string }>;
  return (
    <div className="flex items-start gap-4">
      {IconComponent ? (
        <IconComponent size={24} className="mt-[2px]" />
      ) : (
        <span className="mt-[-5px]">{feature.icon}</span>
      )}
    </div>
  );
};

export default function Sidebyside({
  eyebrow,
  layout,
  title,
  summary,
  link,
  media,
  modifier,
  features,
}: SidebysideProps) {
  const isStatType =
    features && features.length > 0 && features[0].type === 'stat';

  return (
    <div
      className={`flex flex-col lg:flex-row items-center justify-between gap-6 ${
        modifier ?? 'container my-6 lg:my-25'
      } ${layout === 'right' ? 'lg:flex-row-reverse' : ''}`}
    >
      <div className="w-full lg:w-1/2">{media}</div>
      <div className="w-full lg:w-1/2 xl:w-5/12 flex flex-col gap-4">
        {eyebrow && (
          <div className="flex">
            <Badge
              variant="secondary"
              className="sidebyside-badge uppercase inline-flex"
            >
              {eyebrow}
            </Badge>
          </div>
        )}
        <h2 className="text-3xl font-bold">{title}</h2>
        {summary && (
          <div
            className="mb-2 lg:mb-4"
            dangerouslySetInnerHTML={{ __html: summary }}
          />
        )}
        {features && features.length > 0 && (
          <div
            className={
              isStatType
                ? 'flex flex-col sm:flex-row gap-4 mb-6'
                : 'mb-6 space-y-4'
            }
          >
            {features.map((feature, index) =>
              feature.type === 'stat' ? (
                <StatCard
                  key={index}
                  {...(feature as StatCardProps)}
                  layout="left"
                  border={false}
                  modifier="w-full"
                />
              ) : (
                <BulletFeature
                  key={index}
                  feature={feature as BulletProps}
                />
              )
            )}
          </div>
        )}
        {link?.url && (
          <div className="flex">
            <Button variant="default" asChild>
              <a href={link.url}>{link.title ?? 'Read more'}</a>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
