import NodeArticleComponent from "@/components/node/NodeArticle";
import NodePageComponent from "@/components/node/NodePage";
import NodeLandingComponent from "@/components/node/NodeLanding";
import {
  NodePageFragment,
  NodeArticleFragment,
  NodeLandingFragment
} from "@/graphql/fragments/node";
import {
  TextFragment,
  TextSummaryFragment,
  DateTimeFragment,
  LanguageFragment,
  LinkFragment
} from '@/graphql/fragments/misc';
import { 
  MediaUnionFragment, 
  MediaImageFragment, 
  MediaVideoFragment,
  ImageFragment,
  SvgMediaFragment,
  SvgImageFragment 
} from "@/graphql/fragments/media";
import { 
  MetaTagUnionFragment,
  MetaTagLinkFragment,
  MetaTagValueFragment,
  MetaTagPropertyFragment,
  MetaTagScriptFragment,
  MetaTagLinkAttributesFragment,
  MetaTagValueAttributesFragment,
  MetaTagPropertyAttributesFragment,
  MetaTagScriptAttributesFragment
} from "@/graphql/fragments/metatag";
import { ParagraphUnionFragment } from "@/graphql/fragments/paragraph";
import { ParagraphHeroFragment } from "@/components/paragraphs/ParagraphHero";
import { ParagraphTextFragment } from "@/components/paragraphs/ParagraphText";
import { ParagraphMediaFragment } from "@/components/paragraphs/ParagraphMedia";
import { ParagraphQuoteFragment } from "@/components/paragraphs/ParagraphQuote";
import { ParagraphAccordionFragment, ParagraphAccordionItemFragment } from "@/components/paragraphs/ParagraphAccordion";
import { ParagraphCardGroupFragment, ParagraphCardFragment, ParagraphStatsItemFragment } from "@/components/paragraphs/ParagraphCardGroup";
import { ParagraphGalleryFragment } from "@/components/paragraphs/ParagraphGallery";
import { ParagraphSidebysideFragment, ParagraphBulletFragment } from "@/components/paragraphs/ParagraphSidebyside";
import { ParagraphCarouselFragment } from "@/components/paragraphs/ParagraphCarousel";
import { ParagraphEmbedFragment } from "@/components/paragraphs/ParagraphEmbed";
import { ParagraphNewsletterFragment } from "@/components/paragraphs/ParagraphNewsletter";
import { ParagraphPricingFragment, ParagraphPricingCardFragment } from "@/components/paragraphs/ParagraphPricing";
import { ParagraphLogoCollectionFragment } from "@/components/paragraphs/ParagraphLogoCollection";
import { ParagraphViewFragment } from "@/components/paragraphs/ParagraphView";
import { TermUnionFragment, TermAuthorFragment, TermTagFragment } from "@/graphql/fragments/term";
import { UserFragment } from "@/graphql/fragments/user";
import { getClientWithAuth } from "@/utils/client.server";
import { calculatePath } from "@/utils/routes";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Fragment } from "react";
import { Metadata, ResolvingMetadata } from 'next'
import { frontpagePath } from '@/utils/routes';

interface NodeType {
  path: string;
}

interface QueryData {
  nodePages?: { nodes?: NodeType[] };
  nodeArticles?: { nodes?: NodeType[] };
  nodeLandings?: { nodes?: NodeType[] };
}

interface EntityType {
  title?: string;
  __typename?: string;
}

type Props = {
  params: { slug: string[] }
}

// Configure the page type to be a static page.
const staticTypes = ['nodePages', 'nodeArticles', 'nodeLandings'];

async function getAllPaths(): Promise<string[]> {
  const client = await getClientWithAuth();
  
  const allPathsQuery = /* GraphQL */ `
    query allPaths {
      ${staticTypes.map(type => `
        ${type}(first: 100) {
          nodes {
            path
          }
        }
      `).join('\n')}
    }
  `;
  
  const { data } = await client.query(allPathsQuery, {});
  if (!data) {
    console.error('Failed to fetch paths from Drupal');
    return [];
  }
  
  const allPaths = staticTypes.flatMap(type => {
    const typeData = (data as QueryData)[type as keyof QueryData];
    return typeData?.nodes?.map(node => node.path) || [];
  });
  
  return allPaths.filter(path => path && path !== frontpagePath);
}

export async function generateStaticParams(): Promise<{ slug: string[] }[]> {
  const paths = await getAllPaths();
  return paths.map((path: string) => ({
    slug: path.split('/').filter(segment => segment !== ''),
  }));
}

async function getPageData({ params }: Props) {
  return await getDrupalData({ params });
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { entity } = await getPageData({ params });
  const typedEntity = entity as EntityType;
  return {
    title: typedEntity.title ?? '',
  }
}

async function getDrupalData({ params }: { params: { slug: string[] } }) {
  const pathFromParams = params.slug?.join("/") || frontpagePath;
  const requestUrl = headers().get("x-url");
  const path = calculatePath({
    path: pathFromParams,
    url: requestUrl!,
  });

  const client = await getClientWithAuth();
  const nodeRouteQuery = /* GraphQL */ `
    query route($path: String!) {
      route(path: $path) {
        __typename
        ... on RouteInternal {
          entity {
            __typename
            ...NodePageFragment
            ...NodeArticleFragment
            ...NodeLandingFragment
          }
        }
      }
    }
    ${NodePageFragment}
    ${NodeArticleFragment}
    ${NodeLandingFragment}
    ${UserFragment}
    ${TextFragment}
    ${TextSummaryFragment}
    ${DateTimeFragment}
    ${LanguageFragment}
    ${LinkFragment}
    ${MediaUnionFragment}
    ${MediaImageFragment}
    ${MediaVideoFragment}
    ${ImageFragment}
    ${SvgMediaFragment}
    ${SvgImageFragment}
    ${MetaTagUnionFragment}
    ${MetaTagLinkFragment}
    ${MetaTagValueFragment}
    ${MetaTagPropertyFragment}
    ${MetaTagScriptFragment}
    ${MetaTagLinkAttributesFragment}
    ${MetaTagValueAttributesFragment}
    ${MetaTagPropertyAttributesFragment}
    ${MetaTagScriptAttributesFragment}
    ${ParagraphUnionFragment}
    ${ParagraphHeroFragment}
    ${ParagraphTextFragment}
    ${ParagraphMediaFragment}
    ${ParagraphQuoteFragment}
    ${ParagraphAccordionFragment}
    ${ParagraphAccordionItemFragment}
    ${ParagraphCardGroupFragment}
    ${ParagraphCardFragment}
    ${ParagraphStatsItemFragment}
    ${ParagraphGalleryFragment}
    ${ParagraphSidebysideFragment}
    ${ParagraphBulletFragment}
    ${ParagraphCarouselFragment}
    ${ParagraphEmbedFragment}
    ${ParagraphNewsletterFragment}
    ${ParagraphPricingFragment}
    ${ParagraphPricingCardFragment}
    ${ParagraphLogoCollectionFragment}
    ${ParagraphViewFragment}
    ${TermUnionFragment}
    ${TermAuthorFragment}
    ${TermTagFragment}
  `;

  const { data, error } = await client.query(nodeRouteQuery, {
    path,
  });

  if (error) {
    throw error;
  }

  if (
    !data ||
    !data?.route ||
    data?.route.__typename !== "RouteInternal" ||
    !data.route.entity
  ) {
    return redirect('/page-not-found');
  }

  return {
    type: data.route.entity.__typename,
    entity: data.route.entity,
    environment: process.env.ENVIRONMENT!,
  };
}

export default async function Page({ params }: { params: { slug: string[] } }) {
  const { type, entity, environment } = await getPageData({ params });

  if (!type || !entity) {
    return null;
  }

  return (
    <Fragment>
      {type === "NodePage" && (
        <NodePageComponent
          node={entity}
          environment={environment}
        />
      )}
      {type === "NodeArticle" && (
        <NodeArticleComponent
          node={entity}
          environment={environment}
        />
      )}
      {type === "NodeLanding" && (
        <NodeLandingComponent
          node={entity}
          environment={environment}
        />
      )}
    </Fragment>
  );
}
