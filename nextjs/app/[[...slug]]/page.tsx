import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Metadata, ResolvingMetadata } from 'next';
import NodeArticleComponent from "@/components/node/NodeArticle";
import NodePageComponent from "@/components/node/NodePage";
import NodeLandingComponent from "@/components/node/NodeLanding";

// Enable dynamic rendering for specific paths that need headers
export const dynamic = 'auto';
// Enable static rendering with revalidation for other paths
export const revalidate = 3600;

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

import { ParagraphAccordionFragment, ParagraphAccordionItemFragment } from "@/components/paragraphs/ParagraphAccordion";
import { ParagraphBulletFragment } from "@/components/paragraphs/ParagraphBullet";
import { ParagraphCarouselFragment } from "@/components/paragraphs/ParagraphCarousel";
import { ParagraphCardFragment } from "@/components/paragraphs/ParagraphCard";
import { ParagraphCardGroupFragment } from "@/components/paragraphs/ParagraphCardGroup";
import { ParagraphEmbedFragment } from "@/components/paragraphs/ParagraphEmbed";
import { ParagraphGalleryFragment } from "@/components/paragraphs/ParagraphGallery";
import { ParagraphHeroFragment } from "@/components/paragraphs/ParagraphHero";
import { ParagraphLogoCollectionFragment } from "@/components/paragraphs/ParagraphLogoCollection";
import { ParagraphMediaFragment } from "@/components/paragraphs/ParagraphMedia";
import { ParagraphNewsletterFragment } from "@/components/paragraphs/ParagraphNewsletter";
import { ParagraphPricingFragment, ParagraphPricingCardFragment } from "@/components/paragraphs/ParagraphPricing";
import { ParagraphQuoteFragment } from "@/components/paragraphs/ParagraphQuote";
import { ParagraphSidebysideFragment } from "@/components/paragraphs/ParagraphSidebyside";
import { ParagraphStatsItemFragment } from "@/components/paragraphs/ParagraphStatsItem";
import { ParagraphTextFragment } from "@/components/paragraphs/ParagraphText";
import { ParagraphUnionFragment } from "@/graphql/fragments/paragraph";
import { ParagraphViewFragment } from "@/components/paragraphs/ParagraphView";
import { TermUnionFragment, TermAuthorFragment, TermTagFragment } from "@/graphql/fragments/term";
import { UserFragment } from "@/graphql/fragments/user";
import { getClientWithAuth } from "@/utils/client.server";
import { calculatePath, frontpagePath } from "@/utils/routes";

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

type Params = Promise<{ slug: string[] }>;
type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const staticTypes = ['nodePages', 'nodeArticles', 'nodeLandings'];

/**
 * Fetches all available paths for static generation.
 * @returns Promise<string[]> Array of paths.
 */
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
    console.error('Failed to fetch paths from Drupal.');
    return [];
  }

  const allPaths = staticTypes.flatMap(type => {
    const typeData = (data as QueryData)[type as keyof QueryData];
    return typeData?.nodes?.map(node => node.path) || [];
  });

  return allPaths.filter(path => path && path !== frontpagePath);
}

/**
 * Generates static parameters for all paths.
 * @returns Promise<{ slug: string[] }[]> Array of slug parameters for static generation.
 */
export async function generateStaticParams(): Promise<{ slug: string[] }[]> {
  const paths = await getAllPaths();
  return paths.map((path: string) => ({
    slug: path.split('/').filter(segment => segment !== ''),
  }));
}

/**
 * Fetches page data for the current route.
 * @param props Route parameters.
 * @returns Promise containing the page data.
 */
async function getPageData(props: {
  params: Params;
  searchParams?: SearchParams;
}) {
  const params = await props.params;
  return await getDrupalData({ slug: params.slug });
}

/**
 * Generates metadata for the current page.
 * @param props Route parameters.
 * @param parent Parent metadata.
 * @returns Promise<Metadata> Page metadata.
 */
export async function generateMetadata(
  props: { params: Params; searchParams: SearchParams },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { entity } = await getPageData({ params: props.params });
  const typedEntity = entity as EntityType;
  return {
    title: typedEntity.title ?? '',
  }
}

/**
 * Fetches Drupal data for the current route.
 * @param params Object containing the slug.
 * @returns Object containing entity data and environment.
 */
async function getDrupalData({ slug }: { slug: string[] }) {
  const pathFromParams = slug?.join("/") || frontpagePath;

  // Get the request URL if available, otherwise construct a default URL
  let path = pathFromParams;
  try {
    const headersList = await headers();
    const requestUrl = headersList.get("x-url");
    if (requestUrl) {
      path = calculatePath({
        path: pathFromParams,
        url: requestUrl,
      });
    }
  } catch (e) {
    // If headers() fails (during static generation), use the pathFromParams
    console.log('Using default path for static generation:', pathFromParams);
  }

  const client = await getClientWithAuth();

  // Define the main route query with all necessary fragments.
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
    # Node fragments
    ${NodePageFragment}
    ${NodeArticleFragment}
    ${NodeLandingFragment}

    # User fragments
    ${UserFragment}

    # Basic field fragments
    ${TextFragment}
    ${TextSummaryFragment}
    ${DateTimeFragment}
    ${LanguageFragment}
    ${LinkFragment}

    # Media fragments
    ${MediaUnionFragment}
    ${MediaImageFragment}
    ${MediaVideoFragment}
    ${ImageFragment}
    ${SvgMediaFragment}
    ${SvgImageFragment}

    # Metatag fragments
    ${MetaTagUnionFragment}
    ${MetaTagLinkFragment}
    ${MetaTagValueFragment}
    ${MetaTagPropertyFragment}
    ${MetaTagScriptFragment}
    ${MetaTagLinkAttributesFragment}
    ${MetaTagValueAttributesFragment}
    ${MetaTagPropertyAttributesFragment}
    ${MetaTagScriptAttributesFragment}

    # Paragraph fragments
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

    # Taxonomy term fragments
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

/**
 * Main page component that renders different node types based on the route.
 * @param props Object containing route parameters.
 * @returns React component based on the node type.
 */
export default async function Page(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const params = await props.params;
  const { type, entity, environment } = await getPageData({ params: props.params });

  if (!type || !entity) {
    return null;
  }

  return (
    <>
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
    </>
  );
}
