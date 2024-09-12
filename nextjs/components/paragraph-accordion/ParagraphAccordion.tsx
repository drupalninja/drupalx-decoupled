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
    <div className={`bg-gray-100 py-6 lg:py-15 ${containerModifier ?? ''}`}>
      <div className="container">
        {title && <Heading title={title} level={2} className='text-gray-900 mb-8' />}
        <div className={`mb-4 ${modifier ?? ''}`}>
          <Accordion type="single" collapsible className="w-full">
            {(accordionItem as any).map((item: any, index: number) => (
              <AccordionItem value={`item-${index}`} key={index} className="accordion-item bg-white rounded-lg overflow-hidden">
                <AccordionTrigger className="text-lg font-semibold py-4 px-6 hover:bg-blue-100">
                  {item?.title}
                </AccordionTrigger>
                <AccordionContent className="accordion-content px-6 py-4">
                  <div dangerouslySetInnerHTML={{ __html: item?.body.value }} />
                  {item.link && (
                    <Button
                      asChild
                      variant="default"
                      className="mt-4"
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
    </div>
  );
}
