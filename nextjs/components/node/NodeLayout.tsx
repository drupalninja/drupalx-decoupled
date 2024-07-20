import { Fragment } from "react";
import { FragmentOf, readFragment } from "gql.tada";
import { NodeLayoutFragment } from "@/graphql/fragments/node";
import { resolve } from "@/components/helpers/ComponentResolver";
import Heading from "@/components/Heading/Heading";

type NodeLayoutComponentProps = {
  node: FragmentOf<typeof NodeLayoutFragment>;
  environment: string;
}

export default function NodeLayoutComponent({ node, environment }: NodeLayoutComponentProps) {
  const nodeLayout = readFragment(
    NodeLayoutFragment,
    node
  );
  const components = resolve({
    data: nodeLayout.content,
    environment,
  });

  return (
    <>
      <Heading level={1} title={nodeLayout.title} modifier="container mb-4" />
      <p>{nodeLayout.summary}</p>
      {components.map((component, index: number) => {
        return <Fragment key={index}>{component}</Fragment>;
      })}
    </>
  );
}
