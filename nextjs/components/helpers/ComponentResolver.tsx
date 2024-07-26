import { FragmentOf, readFragment } from "gql.tada";

import ParagraphText from "@/components/paragraph-text/ParagraphText";
import ParagraphMedia from "@/components/paragraph-media/ParagraphMedia";
import ParagraphQuote from "@/components/paragraph-quote/ParagraphQuote";
import ParagraphHero from "@/components/paragraph-hero/ParagraphHero";
import ParagraphAccordion from "@/components/paragraph-accordion/ParagraphAccordion";
import ParagraphCardGroup from "@/components/paragraph-card-group/ParagraphCardGroup";
import ParagraphGallery from "@/components/paragraph-gallery/ParagraphGallery";
import ParagraphSidebyside from "@/components/paragraph-sidebyside/ParagraphSidebyside";
import ParagraphCarousel from "@/components/paragraph-carousel/ParagraphCarousel";
import ParagraphEmbed from "@/components/paragraph-embed/ParagraphEmbed";
import ParagraphNewsletter from "@/components/paragraph-newsletter/ParagraphNewsletter";
import ParagraphView from "@/components/paragraph-view/ParagraphView";

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
  ParagraphEmbedFragment,
  ParagraphNewsletterFragment,
  ParagraphViewFragment,
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
  FragmentOf<typeof ParagraphCarouselFragment> |
  FragmentOf<typeof ParagraphEmbedFragment> |
  FragmentOf<typeof ParagraphNewsletterFragment> |
  FragmentOf<typeof ParagraphViewFragment> |
  { __typename: string; id: string; };

interface ResolveProps {
  data: FragmentOf<typeof ParagraphUnionFragment>[] | null;
  environment: string;
}

const calculateComponent = function (type: string, paragraph: ParagraphFragmentType): JSX.Element {
  switch (type) {
    case 'ParagraphText':
      return <ParagraphText paragraph={paragraph as FragmentOf<typeof ParagraphTextFragment>} />;
    case 'ParagraphMedia':
      return <ParagraphMedia paragraph={paragraph as FragmentOf<typeof ParagraphMediaFragment>} />;
    case 'ParagraphQuote':
      return <ParagraphQuote paragraph={paragraph as FragmentOf<typeof ParagraphQuoteFragment>} />;
    case 'ParagraphHero':
      return <ParagraphHero paragraph={paragraph as FragmentOf<typeof ParagraphHeroFragment>} />;
    case 'ParagraphAccordion':
      return <ParagraphAccordion paragraph={paragraph as FragmentOf<typeof ParagraphAccordionFragment>} />;
    case 'ParagraphCardGroup':
      return <ParagraphCardGroup paragraph={paragraph as FragmentOf<typeof ParagraphCardGroupFragment>} />;
    case 'ParagraphGallery':
      return <ParagraphGallery paragraph={paragraph as FragmentOf<typeof ParagraphGalleryFragment>} />;
    case 'ParagraphSidebyside':
      return <ParagraphSidebyside paragraph={paragraph as FragmentOf<typeof ParagraphSidebysideFragment>} />;
    case 'ParagraphCarousel':
      return <ParagraphCarousel paragraph={paragraph as FragmentOf<typeof ParagraphCarouselFragment>} />;
    case 'ParagraphEmbed':
      return <ParagraphEmbed paragraph={paragraph as FragmentOf<typeof ParagraphEmbedFragment>} />;
    case 'ParagraphNewsletter':
      return <ParagraphNewsletter paragraph={paragraph as FragmentOf<typeof ParagraphNewsletterFragment>} />;
    case 'ParagraphView':
      return <ParagraphView paragraph={paragraph as FragmentOf<typeof ParagraphViewFragment>} />;
    default:
      return <pre>{JSON.stringify(paragraph, null, 2)}</pre>;
  }
}

export const resolve = ({ data = [], environment = 'preview' }: ResolveProps): ComponentType => {
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
