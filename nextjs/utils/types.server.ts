import { FragmentOf } from "gql.tada";
import { NodePageFragment, NodeArticleFragment } from "@/graphql/fragments/node";

export type EntityFragmentType =
    FragmentOf<typeof NodePageFragment> |
    FragmentOf<typeof NodeArticleFragment>;