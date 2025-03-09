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
  return (
    <Accordion
      title={paragraph.title ?? ''}
      items={paragraph.accordionItem as AccordionItemData[] || []}
      modifier={modifier}
      containerModifier={containerModifier}
    />
  );
}
