import { Fragment } from "react";
import { FragmentOf, readFragment } from "gql.tada";
import { NodeLayoutFragment } from "@/graphql/fragments/node";
import { resolve } from "@/components/helpers/ComponentResolver";
import Heading from "@/components/heading/Heading";

type NodeLayoutComponentProps = {
  node: FragmentOf<typeof NodeLayoutFragment>;
  environment: string;
};

export default function NodeLayoutComponent({ node, environment }: NodeLayoutComponentProps) {
  const nodeLayout = readFragment(
    NodeLayoutFragment,
    node
  );
  const components = resolve({
    data: nodeLayout.content as any,
    environment,
  });
  const { title, hidePageTitle } = nodeLayout;

  return (
    <>
      {hidePageTitle ? null : <Heading level={1} title={title} className="container mb-4" />}
      {components.map((component, index: number) => {
        return <Fragment key={index}>{component}</Fragment>;
      })}
    </>
  );
}
