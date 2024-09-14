import { FragmentOf, readFragment } from "gql.tada";
import { NodeLayoutFragment } from "@/graphql/fragments/node";
import { resolve } from "@/components/helpers/ComponentResolver";
import Heading from "@/components/heading/Heading";

type NodeLayoutComponentProps = {
  node: FragmentOf<typeof NodeLayoutFragment>;
  environment: string;
};

export default async function NodeLayoutComponent({ node, environment }: NodeLayoutComponentProps) {
  const nodeLayout = readFragment(NodeLayoutFragment, node);
  const { title, hidePageTitle, content } = nodeLayout;

  const resolvedComponents = await resolve({
    data: content as any,
    environment,
  });

  return (
    <>
      {hidePageTitle ? null : <Heading level={1} title={title} className="container mb-4" />}
      {resolvedComponents}
    </>
  );
}
