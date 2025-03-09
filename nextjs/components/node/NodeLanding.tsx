import { resolve } from "@/components/helpers/ComponentResolver";
import Heading from "@/components/heading/Heading";
import { ParagraphBase } from "@/components/helpers/ComponentResolver";
import React from "react";

type NodeLandingComponentProps = {
  node: {
    title: string;
    hidePageTitle?: boolean;
    content?: Array<ParagraphBase>;
  };
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
    <div className="node-landing">
      {hidePageTitle ? null : <Heading level={1} title={title} className="container mb-10" />}
      {resolvedComponents.map((component, index) => (
        <React.Fragment key={`component-${index}`}>
          {component}
        </React.Fragment>
      ))}
    </div>
  );
}
