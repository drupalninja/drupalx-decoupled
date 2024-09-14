import React from 'react';
import { FragmentOf, readFragment, graphql } from 'gql.tada';
import { DateTimeFragment, LanguageFragment, LinkFragment } from "@/graphql/fragments/misc"
import { MediaUnionFragment, SvgMediaFragment } from "@/graphql/fragments/media"
import CardGroup from '@/components/card-group/CardGroup';
import { getImage } from '@/components/helpers/Utilities';

const ParagraphCardFragment = graphql(`fragment ParagraphCardFragment on ParagraphCard {
  id
  created {
    ...DateTimeFragment
  }
  langcode {
    ...LanguageFragment
  }
  link {
    ...LinkFragment
  }
  media {
    ...MediaUnionFragment
  }
  status
  summary
  title
}`,
  [
    DateTimeFragment,
    LanguageFragment,
    LinkFragment,
    MediaUnionFragment,
  ]
)

const ParagraphStatsItemFragment = graphql(`fragment ParagraphStatsItemFragment on ParagraphStatsItem {
  id
  created {
    ...DateTimeFragment
  }
  customIcon {
    ...SvgMediaFragment
  }
  langcode {
    ...LanguageFragment
  }
  status
  statSummary: summary
  title
}`,
  [
    DateTimeFragment,
    SvgMediaFragment,
    LanguageFragment,
  ]
)

export const ParagraphCardGroupFragment = graphql(`fragment ParagraphCardGroupFragment on ParagraphCardGroup {
  id
  card {
    __typename
    ...ParagraphCardFragment
    ...ParagraphStatsItemFragment
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
    ParagraphCardFragment,
    ParagraphStatsItemFragment,
    DateTimeFragment,
    LanguageFragment,
  ]
)

interface ParagraphCardGroupProps {
  paragraph: FragmentOf<typeof ParagraphCardGroupFragment>,
  modifier?: string,
}

export default function ParagraphCardGroup({ paragraph, modifier }: ParagraphCardGroupProps) {
  const { title, card } = readFragment(ParagraphCardGroupFragment, paragraph);

  const cardItems = card.map((item: any) => {
    if (item.__typename === 'ParagraphStatsItem') {
      return {
        type: 'stat',
        media: getImage(item?.customIcon, 'w-16 h-16 object-contain mx-auto'),
        heading: item?.title,
        body: item?.statSummary,
      };
    } else {
      return {
        type: 'custom',
        media: getImage(item?.media, 'object-cover w-full h-full'),
        mediaLink: item?.link?.url,
        heading: {
          title: item?.title,
          url: item?.link?.url,
        },
        tags: item?.tags,
        summaryText: item?.summary,
        link: item?.link,
      };
    }
  });

  return (
    <CardGroup
      title={title}
      cards={cardItems}
      modifier={modifier}
    />
  );
}
