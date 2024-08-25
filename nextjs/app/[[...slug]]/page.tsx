import NodeArticleComponent from "@/components/node/NodeArticle";
import NodePageComponent from "@/components/node/NodePage";
import NodeLayoutComponent from "@/components/node/NodeLayout";
import {
  NodeArticleFragment,
  NodeLayoutFragment,
  NodePageFragment,
} from "@/graphql/fragments/node";
import { graphql } from "@/graphql/gql.tada";
import { getClientWithAuth } from "@/utils/client.server";
import { calculatePath } from "@/utils/routes";
import { EntityFragmentType } from "@/utils/types.server";
import { FragmentOf } from "gql.tada";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Fragment } from "react";
import { Metadata, ResolvingMetadata } from 'next'
import { frontpagePath } from '@/utils/routes';

type Props = {
  params: { slug: string[] }
}

// Configure the page type to be a static page.
const staticTypes = ['nodePages', 'nodeArticles', 'nodeLayouts'];

async function getAllPaths(): Promise<string[]> {
  const client = await getClientWithAuth();
  const allPathsQuery = graphql(`
    query allPaths {
      ${staticTypes.map(type => `
        ${type}(first: 100) {
          nodes {
            path
          }
        }
      `).join('\n')}
    }
  `);

  const { data } = await client.query(allPathsQuery, {});

  if (!data) {
    console.error('Failed to fetch paths from Drupal');
    return [];
  }

  const allPaths = staticTypes.flatMap(type => {
    return (data as any)[type]?.nodes?.map((node: any) => node.path) || [];
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
  const { entity } = await getPageData({ params })

  let title = (entity as any).title ?? '';

  return {
    title: title,
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

  const nodeRouteQuery = graphql(
    `
      query route($path: String!) {
        route(path: $path) {
          __typename
          ... on RouteInternal {
            entity {
              __typename
              ... on NodePage {
                id
                title
              }
              ...NodePageFragment
              ...NodeArticleFragment
              ...NodeLayoutFragment
            }
          }
        }
      }
    `,
    [NodePageFragment, NodeArticleFragment, NodeLayoutFragment]
  );

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
    entity: data.route.entity as EntityFragmentType,
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
          node={entity as FragmentOf<typeof NodePageFragment>}
          environment={environment}
        />
      )}
      {type === "NodeArticle" && (
        <NodeArticleComponent
          node={entity as FragmentOf<typeof NodeArticleFragment>}
          environment={environment}
        />
      )}
      {type === "NodeLayout" && (
        <NodeLayoutComponent
          node={entity as FragmentOf<typeof NodeLayoutFragment>}
          environment={environment}
        />
      )}
    </Fragment>
  );
}
