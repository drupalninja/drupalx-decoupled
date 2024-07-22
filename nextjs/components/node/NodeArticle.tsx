import { Fragment } from "react";
import { FragmentOf, readFragment } from "gql.tada";
import { NodeArticleFragment } from "@/graphql/fragments/node";
import CoverImage from "@/components/CoverImage";
import { resolve } from "@/components/helpers/ComponentResolver";
import { MediaImageFragment } from "@/graphql/fragments/media";

type NodeArticleComponentProps = {
  node: FragmentOf<typeof NodeArticleFragment>;
  environment: string;
}

export default function NodeArticleComponent({ node, environment }: NodeArticleComponentProps) {
  const { title, lead, path, media, summary } = readFragment(
    NodeArticleFragment,
    node
  );

  return (
    <>
      <h1>{title}</h1>
      <p dangerouslySetInnerHTML={{ __html: lead?.value }} data-cy="lead-content" />
      <p>{summary}</p>
      <CoverImage
        title={title}
        path={path}
        image={media}
        width={800}
        height={600}
        styleName="medium"
      />
    </>
  );
}
