import React from 'react';
import { Card } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export interface PricingCardProps {
  eyebrow: string;
  title: string;
  monthlyLabel?: string;
  features: string[];
  ctaText: string;
  ctaLink: string;
  includesLabel?: string;
}

interface PricingCard extends React.FC<PricingCardProps> {
  (props: PricingCardProps & { includesLabel: string }): JSX.Element;
}

const PricingCard: PricingCard = ({ eyebrow, title, monthlyLabel = '', features, ctaText, ctaLink, includesLabel = 'Includes' }) => (
  <Card className="flex h-full flex-col justify-between p-6 md:p-8 border border-border-primary">
    <div>
      <h2 className="mb-2 text-md font-bold leading-[1.4] md:text-xl">{eyebrow}</h2>
      <h3 className="my-2 text-4xl font-bold md:text-4xl lg:text-5xl">
        {title}
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
      <Button asChild variant="default" className='w-full'>
        <Link href={ctaLink}>
          {ctaText}
        </Link>
      </Button>
    </div>
  </Card>
);

export interface PricingProps {
  eyebrow?: string;
  title?: string;
  summary?: string;
  cards: PricingCardProps[];
  includesLabel?: string;
}

const Pricing: React.FC<PricingProps> = ({
  eyebrow = "Tagline",
  title = "Pricing plan",
  summary = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  cards,
  includesLabel = "Includes"
}) => {
  const gridColumns = cards.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3';

  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mx-auto mb-12 max-w-lg text-center md:mb-18 lg:mb-20">
          <p className="mb-3 font-semibold md:mb-4">{eyebrow}</p>
          <h1 className="mb-5 text-5xl font-bold md:mb-6 md:text-6xl lg:text-7xl">{title}</h1>
          <div className="md:text-md" dangerouslySetInnerHTML={{ __html: summary }}></div>
        </div>
        <div className={`grid grid-cols-1 gap-8 ${gridColumns}`}>
          {cards.map((card, index) => (
            <PricingCard
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

export default Pricing;
