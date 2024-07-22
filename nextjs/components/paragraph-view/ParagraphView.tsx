import { getClient } from "@/utils/client.server";
import { FragmentOf, graphql } from 'gql.tada';
import { ParagraphViewFragment } from '@/graphql/fragments/paragraph';
import './ParagraphView.scss';

interface ParagraphViewProps {
  paragraph: FragmentOf<typeof ParagraphViewFragment>,
  modifier?: string,
}

export default async function ParagraphView({ paragraph, modifier }: ParagraphViewProps) {

  return (
    <><p>View</p></>
  );
}
