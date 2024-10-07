import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface CompareCardProps {
  title: string;
  price: string;
  monthlyLabel?: string;
  features: string[];
  ctaText: string;
  ctaAction: () => void;
  iconUrl?: string;
}

interface CompareCard extends React.FC<CompareCardProps> {
  (props: CompareCardProps & { includesLabel: string }): JSX.Element;
}

const CompareCard: CompareCard = ({ title, price, monthlyLabel = '', features, ctaText, ctaAction, iconUrl, includesLabel }) => (
  <Card className="flex h-full flex-col justify-between p-6 md:p-8 border border-border-primary">
    <div>
      <h2 className="mb-2 text-md font-bold leading-[1.4] md:text-xl">{title}</h2>
      <h3 className="my-2 text-4xl font-bold md:text-4xl lg:text-5xl">
        {price}
        {monthlyLabel && <span className="text-xl font-bold md:text-2xl md:leading-[1.3] lg:text-3xl">/{monthlyLabel}</span>}
      </h3>
      <div className="my-8 h-px w-full bg-border"></div>
      <p>{includesLabel}:</p>
      <div className="mb-8 mt-4 grid grid-cols-1 gap-y-4 py-2">
        {features.map((feature, index) => (
          <div key={index} className="flex self-start">
            <div className="mr-4 flex-none self-start">
              <Check className="size-6" />
            </div>
            <p>{feature}</p>
          </div>
        ))}
      </div>
    </div>
    <div>
      <Button
        className="w-full"
        onClick={ctaAction}
      >
        {ctaText}
      </Button>
    </div>
  </Card>
);

export interface CardCompareProps {
  tagline?: string;
  title?: string;
  description?: string;
  cards: CompareCardProps[];
  includesLabel?: string;
}

const CardCompare: React.FC<CardCompareProps> = ({
  tagline = "Tagline",
  title = "Pricing plan",
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  cards,
  includesLabel = "Includes"
}) => {
  const gridColumns = cards.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3';

  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mx-auto mb-12 max-w-lg text-center md:mb-18 lg:mb-20">
          <p className="mb-3 font-semibold md:mb-4">{tagline}</p>
          <h1 className="mb-5 text-5xl font-bold md:mb-6 md:text-6xl lg:text-7xl">{title}</h1>
          <p className="md:text-md">{description}</p>
        </div>
        <div className={`grid grid-cols-1 gap-8 ${gridColumns}`}>
          {cards.map((card, index) => (
            <CompareCard
              key={index}
              {...card}
              includesLabel={includesLabel}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CardCompare;
