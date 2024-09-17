import { FragmentOf } from "gql.tada";
import { NodePageFragment, NodeArticleFragment, NodeLandingFragment } from "@/graphql/fragments/node";

export type EntityFragmentType =
    FragmentOf<typeof NodePageFragment> |
    FragmentOf<typeof NodeArticleFragment> |
    FragmentOf<typeof NodeLandingFragment>;
