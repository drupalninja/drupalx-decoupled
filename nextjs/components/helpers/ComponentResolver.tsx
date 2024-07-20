import { FragmentOf, readFragment } from "gql.tada";

import ParagraphText from "@/components/ParagraphText/ParagraphText";
import ParagraphMedia from "@/components/ParagraphMedia/ParagraphMedia";
import ParagraphQuote from "@/components/ParagraphQuote/ParagraphQuote";
import ParagraphHero from "@/components/ParagraphHero/ParagraphHero";
import ParagraphAccordion from "@/components/ParagraphAccordion/ParagraphAccordion";
import ParagraphCardGroup from "@/components/ParagraphCardGroup/ParagraphCardGroup";

import {
  ParagraphTextFragment,
  ParagraphMediaFragment,
  ParagraphQuoteFragment,
  ParagraphHeroFragment,
  ParagraphAccordionFragment,
  ParagraphCardGroupFragment,
  ParagraphUnionFragment,
} from "@/graphql/fragments/paragraph";

type ComponentType = Array<JSX.Element>;
type ParagraphFragmentType =
  FragmentOf<typeof ParagraphTextFragment> |
  FragmentOf<typeof ParagraphMediaFragment> |
  FragmentOf<typeof ParagraphQuoteFragment> |
  FragmentOf<typeof ParagraphHeroFragment> |
  FragmentOf<typeof ParagraphAccordionFragment> |
  FragmentOf<typeof ParagraphCardGroupFragment>;

interface ResolveProps {
  data: FragmentOf<typeof ParagraphUnionFragment>[] | null;
  environment: string;
}

const calculateComponent = function (type: string, paragraph: ParagraphFragmentType): JSX.Element {
  if (type === 'ParagraphText') {
    return <ParagraphText paragraph={paragraph as FragmentOf<typeof ParagraphTextFragment>} />;
  }
  if (type === 'ParagraphMedia') {
    return <ParagraphMedia paragraph={paragraph as FragmentOf<typeof ParagraphMediaFragment>} />;
  }
  if (type === 'ParagraphQuote') {
    return <ParagraphQuote paragraph={paragraph as FragmentOf<typeof ParagraphQuoteFragment>} />;
  }
  if (type === 'ParagraphHero') {
    return <ParagraphHero paragraph={paragraph as FragmentOf<typeof ParagraphHeroFragment>} />;
  }
  if (type === 'ParagraphAccordion') {
    return <ParagraphAccordion paragraph={paragraph as FragmentOf<typeof ParagraphAccordionFragment>} />;
  }
  if (type === 'ParagraphCardGroup') {
    return <ParagraphCardGroup paragraph={paragraph as FragmentOf<typeof ParagraphCardGroupFragment>} />;
  }
  return <pre>{JSON.stringify(paragraph, null, 2)}</pre>;
}

export const resolve = ({data = [], environment = 'preview'}: ResolveProps): ComponentType => {
  if (!data) {
    return [];
  }

  const paragraphUnionFragment = readFragment(ParagraphUnionFragment, data); 
  const components: Array<JSX.Element> = [];
  
  paragraphUnionFragment.forEach((paragraph) => {
    const type = paragraph.__typename;

    if (!type) {
      return <></>;
    }

    const ParagraphComponent = calculateComponent(type, paragraph);

    components.push(ParagraphComponent);
  });

  return components;
};
