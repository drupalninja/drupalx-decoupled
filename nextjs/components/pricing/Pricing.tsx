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
  <Card className="flex h-full flex-col justify-between p-4 sm:p-6 md:p-8 border border-border-primary">
    <div>
      <h2 className="mb-2 text-md font-bold leading-[1.4] md:text-xl">{eyebrow}</h2>
      <h3 className="my-2 text-2xl font-bold sm:text-3xl lg:text-4xl">
        {title}
        {monthlyLabel && <span className="text-lg font-bold md:leading-[1.3] sm:text-xl lg:text-2xl">/{monthlyLabel}</span>}
      </h3>
      <div className="my-4 sm:my-8 h-px w-full bg-border"></div>
      <p className="text-sm sm:text-base">{includesLabel}:</p>
      <div className="mb-6 sm:mb-8 mt-3 sm:mt-4 grid grid-cols-1 gap-y-3 sm:gap-y-4 py-2">
        {features.map((feature, index) => (
          <div key={index} className="flex self-start">
            <div className="mr-3 sm:mr-4 flex-none self-start">
              <Check className="size-5 sm:size-6" />
            </div>
            <p className="text-sm sm:text-base">{feature}</p>
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
    <div className={cards.length == 3 ? 'mx-auto' : `max-w-5xl mx-auto`}>
      <section className="px-4 sm:px-[5%] my-12 lg:my-25">
        <div className="mx-auto max-w-lg text-center mb-6 lg:mb-12">
          <p className="eyebrow mb-2 sm:mb-3 text-sm sm:text-base font-semibold md:mb-4">{eyebrow}</p>
          <h2 className="mb-4 sm:mb-5 text-3xl sm:text-4xl md:text-5xl font-semibold md:mb-6 lg:text-7xl">{title}</h2>
          <div className="summary text-sm sm:text-base md:text-md" dangerouslySetInnerHTML={{ __html: summary }}></div>
        </div>
        <div className={`grid grid-cols-1 gap-6 sm:gap-8 ${gridColumns}`}>
          {cards.map((card, index) => (
            <PricingCard
              key={index}
              {...card}
              includesLabel={includesLabel}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Pricing;
