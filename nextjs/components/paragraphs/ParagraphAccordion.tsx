import Accordion, { AccordionItemData, AccordionProps } from '@/components/accordion/Accordion';

export const ParagraphAccordionItemFragment = /* GraphQL */ `
  fragment ParagraphAccordionItemFragment on ParagraphAccordionItem {
    body {
      ...TextSummaryFragment
    }
    link {
      ...LinkFragment
    }
    title
  }
`;

export const ParagraphAccordionFragment = /* GraphQL */ `
  fragment ParagraphAccordionFragment on ParagraphAccordion {
    accordionItem {
      ...ParagraphAccordionItemFragment
    }
    title
  }
`;

interface ParagraphAccordionProps {
  paragraph: {
    id: string;
    title?: string;
    accordionItem?: AccordionItemData[];
  };
  modifier?: string;
  containerModifier?: string;
}

export interface ResolvedAccordionData {
  title?: string;
  items: AccordionItemData[];
}

function resolveAccordionData(paragraph: ParagraphAccordionProps['paragraph']): ResolvedAccordionData {
  const { title, accordionItem } = paragraph;
  return {
    title: title ?? '',
    items: accordionItem as AccordionItemData[] || [],
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
