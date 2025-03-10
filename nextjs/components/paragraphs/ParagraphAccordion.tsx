import Accordion, { AccordionItemData } from '@/components/accordion/Accordion';

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
    title?: string;
    accordionItem?: AccordionItemData[];
  };
  modifier?: string;
  containerModifier?: string;
}

export default function ParagraphAccordion({ paragraph, modifier, containerModifier }: ParagraphAccordionProps) {
  // Add ids to accordion items if they don't already have them
  const accordionItems = paragraph.accordionItem?.map((item, index) => {
    if (!item) return null;

    return {
      ...item,
      id: item.id || `accordion-item-${index}`,
    };
  }).filter(Boolean) as AccordionItemData[] || [];

  return (
    <Accordion
      title={paragraph.title ?? ''}
      items={accordionItems}
      modifier={modifier}
      containerModifier={containerModifier}
    />
  );
}
