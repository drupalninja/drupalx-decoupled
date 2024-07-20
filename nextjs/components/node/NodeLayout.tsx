import { Fragment } from "react";
import { FragmentOf, readFragment } from "gql.tada";
import { NodeLayoutFragment } from "@/graphql/fragments/node";
import { resolve } from "@/components/helpers/ComponentResolver";

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
      <h1>{nodeLayout.title}</h1>
      <p>{nodeLayout.summary}</p>
      {components.map((component, index: number) => {
        return <Fragment key={index}>{component}</Fragment>;
      })}
    </>
  );
}
