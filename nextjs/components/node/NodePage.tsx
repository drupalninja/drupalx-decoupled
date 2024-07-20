import { Fragment } from "react";
import { FragmentOf, readFragment } from "gql.tada";
import { NodePageFragment } from "@/graphql/fragments/node";
import { resolve } from "@/components/helpers/ComponentResolver";

type NodePageComponentProps = {
  node: FragmentOf<typeof NodePageFragment>;
  environment: string;
}

export default function NodePageComponent({ node, environment } : NodePageComponentProps) {
  const nodePage = readFragment(NodePageFragment, node);
  const components = resolve({
    data: nodePage.components,
    environment,
  });

  return (
    <>
      {nodePage?.showTitle && <h1>{nodePage.title}</h1>}
      {components.map((component, index: number) => {
        return <Fragment key={index}>{component}</Fragment>;
      })}
    </>
  );
}
