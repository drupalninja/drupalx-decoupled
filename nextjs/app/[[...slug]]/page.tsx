import { GetStaticPaths } from 'next';
import NodeArticleComponent from "@/components/node/NodeArticle";
import NodePageComponent from "@/components/node/NodePage";
import NodeLayoutComponent from "@/components/node/NodeLayout";
import {
  NodeArticleFragment,
  NodeLayoutFragment,
  NodePageFragment,
} from "@/graphql/fragments/node";
import { graphql } from "@/graphql/gql.tada";
import { getClient } from "@/utils/client.server";
import { calculatePath } from "@/utils/routes";
import { EntityFragmentType } from "@/utils/types.server";
import { FragmentOf } from "gql.tada";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Fragment } from "react";
import { Metadata, ResolvingMetadata } from 'next'

type Props = {
  params: { slug: string[] }
}

type AllPathsQueryResult = {
  nodePages: {
    nodes: {
      path: string
    }[]
  }
}

async function getAllPaths(): Promise<string[]> {
  const client = await getClient({
    url: process.env.DRUPAL_GRAPHQL_URI!,
    auth: {
      uri: process.env.DRUPAL_AUTH_URI!,
      clientId: process.env.DRUPAL_CLIENT_ID!,
      clientSecret: process.env.DRUPAL_CLIENT_SECRET!,
    },
  });

  const allPathsQuery = graphql(`
    query allPaths {
      nodePages (first: 100) {
        nodes {
          path
        }
      }
    }

  `);

  const { data } = await client.query(allPathsQuery, {});

  console.log(data);

  if (!data) {
    console.error('Failed to fetch paths from Drupal');
    return [];
  }

  const typedData = data as AllPathsQueryResult;

  if (!typedData.nodePages || !typedData.nodePages.nodes) {
    console.error('Unexpected data structure returned from Drupal');
    return [];
  }

  return typedData.nodePages.nodes
    .map(node => node.path)
    .filter(path => path !== '/welcome');
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
  const pathFromParams = params.slug?.join("/") || "/welcome";
  const requestUrl = headers().get("x-url");

  const path = calculatePath({
    path: pathFromParams,
    url: requestUrl!,
  });

  const client = await getClient({
    url: process.env.DRUPAL_GRAPHQL_URI!,
    auth: {
      uri: process.env.DRUPAL_AUTH_URI!,
      clientId: process.env.DRUPAL_CLIENT_ID!,
      clientSecret: process.env.DRUPAL_CLIENT_SECRET!,
    },
  });

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