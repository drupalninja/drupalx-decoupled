'use client'

import { FragmentOf, readFragment } from 'gql.tada';
import { ParagraphAccordionFragment } from '@/graphql/fragments/paragraph';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import Heading from '../heading/Heading';

interface ParagraphAccordionProps {
  paragraph: FragmentOf<typeof ParagraphAccordionFragment>
  modifier?: string;
  containerModifier?: string;
}

export default function ParagraphAccordion({ paragraph, modifier, containerModifier }: ParagraphAccordionProps) {
  const { title, accordionItem } = readFragment(ParagraphAccordionFragment, paragraph);

  return (
    <div className={containerModifier ?? 'bg-gray-100 py-6 lg:py-15'}>
      {title && <Heading title={title} modifier='text-gray-900 mb-4 container' />}
      <div className={`mb-4 ${modifier ?? 'container'}`}>
        <Accordion type="single" collapsible className="w-full">
          {(accordionItem as any).map((item: any, index: number) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger className="text-lg font-semibold py-4">
                {item?.title}
              </AccordionTrigger>
              <AccordionContent>
                <div dangerouslySetInnerHTML={{ __html: item?.body.value }} />
                {item.link && (
                  <Button
                    asChild
                    variant="default"
                    className="mt-2"
                  >
                    <a href={item.link?.url}>{item.link?.title}</a>
                  </Button>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
