'use client'

import { FragmentOf, readFragment } from 'gql.tada';
import { ParagraphAccordionFragment } from '@/graphql/fragments/paragraph';
import Accordion from '@/components/accordion/Accordion';

interface ParagraphAccordionProps {
  paragraph: FragmentOf<typeof ParagraphAccordionFragment>
  modifier?: string;
  containerModifier?: string;
}

export interface ResolvedAccordionData {
  title?: string;
  items: {
    title: string;
    body: { value: string };
    link?: { url: string; title: string };
  }[];
}

function resolveAccordionData(paragraph: FragmentOf<typeof ParagraphAccordionFragment>): ResolvedAccordionData {
  const { title, accordionItem } = readFragment(ParagraphAccordionFragment, paragraph);

  return {
    title,
    items: accordionItem as ResolvedAccordionData['items'],
  };
}

export default function ParagraphAccordion({ paragraph, modifier, containerModifier }: ParagraphAccordionProps) {
  const accordionData = resolveAccordionData(paragraph);

  return (
    <Accordion
      title={accordionData.title}
      items={accordionData.items}
      modifier={modifier}
      containerModifier={containerModifier}
    />
  );
}
