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

async function getPageData({ params }: Props) {
  return await getDrupalData({ params });
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { entity } = await getPageData({ params })

  let title = entity?.title ?? '';

  return {
    title: title,
  }
}

async function getDrupalData({ params }: { params: { slug: string[] } }) {
  const pathFromParams = params.slug?.join("/") || "/home";
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
    return redirect("/404");
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
