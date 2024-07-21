import { FragmentOf, readFragment } from "gql.tada";

import ParagraphText from "@/components/ParagraphText/ParagraphText";
import ParagraphMedia from "@/components/ParagraphMedia/ParagraphMedia";
import ParagraphQuote from "@/components/ParagraphQuote/ParagraphQuote";
import ParagraphHero from "@/components/ParagraphHero/ParagraphHero";
import ParagraphAccordion from "@/components/ParagraphAccordion/ParagraphAccordion";
import ParagraphCardGroup from "@/components/ParagraphCardGroup/ParagraphCardGroup";
import ParagraphGallery from "@/components/ParagraphGallery/ParagraphGallery";
import ParagraphSidebyside from "@/components/ParagraphSidebyside/ParagraphSidebyside";
import ParagraphCarousel from "@/components/ParagraphCarousel/ParagraphCarousel";

import {
  ParagraphTextFragment,
  ParagraphMediaFragment,
  ParagraphQuoteFragment,
  ParagraphHeroFragment,
  ParagraphAccordionFragment,
  ParagraphCardGroupFragment,
  ParagraphGalleryFragment,
  ParagraphSidebysideFragment,
  ParagraphCarouselFragment,
  ParagraphUnionFragment,
} from "@/graphql/fragments/paragraph";

type ComponentType = Array<JSX.Element>;
type ParagraphFragmentType =
  FragmentOf<typeof ParagraphTextFragment> |
  FragmentOf<typeof ParagraphMediaFragment> |
  FragmentOf<typeof ParagraphQuoteFragment> |
  FragmentOf<typeof ParagraphHeroFragment> |
  FragmentOf<typeof ParagraphAccordionFragment> |
  FragmentOf<typeof ParagraphCardGroupFragment> |
  FragmentOf<typeof ParagraphGalleryFragment> |
  FragmentOf<typeof ParagraphSidebysideFragment> |
  FragmentOf<typeof ParagraphCarouselFragment>;

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
  if (type === 'ParagraphGallery') {
    return <ParagraphGallery paragraph={paragraph as FragmentOf<typeof ParagraphGalleryFragment>} />;
  }
  if (type === 'ParagraphSidebyside') {
    return <ParagraphSidebyside paragraph={paragraph as FragmentOf<typeof ParagraphSidebysideFragment>} />;
  }
  if (type === 'ParagraphCarousel') {
    return <ParagraphCarousel paragraph={paragraph as FragmentOf<typeof ParagraphCarouselFragment>} />;
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
