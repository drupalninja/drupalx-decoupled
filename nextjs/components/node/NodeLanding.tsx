import { FragmentOf, readFragment } from "gql.tada";
import { NodeLandingFragment } from "@/graphql/fragments/node";
import { resolve } from "@/components/helpers/ComponentResolver";
import Heading from "@/components/heading/Heading";

type NodeLandingComponentProps = {
  node: FragmentOf<typeof NodeLandingFragment>;
  environment: string;
};

export default async function NodeLandingComponent({ node, environment }: NodeLandingComponentProps) {
  const nodeLanding = readFragment(NodeLandingFragment, node);
  const { title, hidePageTitle, content } = nodeLanding;

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
