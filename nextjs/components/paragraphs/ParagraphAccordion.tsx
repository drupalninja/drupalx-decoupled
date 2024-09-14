import { FragmentOf, readFragment, graphql } from 'gql.tada';
import { TextSummaryFragment, DateTimeFragment, LanguageFragment, LinkFragment } from "@/graphql/fragments/misc";
import Accordion from '@/components/accordion/Accordion';

const ParagraphAccordionItemFragment = graphql(`fragment ParagraphAccordionItemFragment on ParagraphAccordionItem {
  id
  body {
    ...TextSummaryFragment
  }
  created {
    ...DateTimeFragment
  }
  langcode {
    ...LanguageFragment
  }
  link {
    ...LinkFragment
  }
  status
  title
}`,
  [
    TextSummaryFragment,
    DateTimeFragment,
    LanguageFragment,
    LinkFragment,
  ]
)

export const ParagraphAccordionFragment = graphql(`fragment ParagraphAccordionFragment on ParagraphAccordion {
  id
  accordionItem {
    ...ParagraphAccordionItemFragment
  }
  created {
    ...DateTimeFragment
  }
  langcode {
    ...LanguageFragment
  }
  status
  title
}`,
  [
    ParagraphAccordionItemFragment,
    DateTimeFragment,
    LanguageFragment,
  ]
)

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
