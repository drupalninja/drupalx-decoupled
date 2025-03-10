import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Metadata, ResolvingMetadata } from 'next';
import { Fragment } from "react";
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

type Props = {
  params: { slug: string[] }
}

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
 * @param params Route parameters.
 * @returns Promise containing the page data.
 */
async function getPageData({ params }: Props) {
  return await getDrupalData({ params });
}

/**
 * Generates metadata for the current page.
 * @param params Route parameters.
 * @param parent Parent metadata.
 * @returns Promise<Metadata> Page metadata.
 */
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

/**
 * Fetches Drupal data for the current route.
 * @param params Route parameters containing the slug.
 * @returns Object containing entity data and environment.
 */
async function getDrupalData({ params }: { params: { slug: string[] } }) {
  const pathFromParams = params.slug?.join("/") || frontpagePath;
  const requestUrl = headers().get("x-url");
  const path = calculatePath({
    path: pathFromParams,
    url: requestUrl!,
  });

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
 * @param params Route parameters containing the slug.
 * @returns React component based on the node type.
 */
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
