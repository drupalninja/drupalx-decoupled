import React from 'react';
import { NodeLandingFragment } from "@/graphql/fragments/node";
import { resolve } from "@/components/helpers/ComponentResolver";
import Heading from "@/components/heading/Heading";
import { ParagraphUnionFragment } from "@/graphql/fragments/paragraph";

type NodeLandingComponentProps = {
  node: any; // Replace with more specific type if available
  environment: string;
};

export default async function NodeLandingComponent({ node, environment }: NodeLandingComponentProps) {
  const { title, hidePageTitle, content } = node;

  const paragraphs = content ?? [];
  const resolvedComponents = await resolve({
    data: paragraphs,
    environment,
  });

  return (
    <>
      {hidePageTitle ? null : <Heading level={1} title={title} className="container mb-10" />}
      {resolvedComponents}
    </>
  );
}
