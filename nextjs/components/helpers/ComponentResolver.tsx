import { FragmentOf, readFragment } from "gql.tada";
import dynamic from 'next/dynamic';

// Dynamic import for ParagraphUnionFragment
const ParagraphUnionFragment = import('@/graphql/fragments/paragraph').then(module => module.ParagraphUnionFragment);

// Type for component props
type ParagraphProps<T> = {
  paragraph: FragmentOf<T>;
};

// Type for dynamic component import
type DynamicComponentType = React.ComponentType<ParagraphProps<any>>;

// Function to dynamically import components
const importComponent = (type: string): Promise<DynamicComponentType> => {
  const formattedType = type.replace(/^Paragraph/, '');
  return dynamic(() => import(`@/components/paragraph-${formattedType.toLowerCase()}/Paragraph${formattedType}`)) as unknown as Promise<DynamicComponentType>;
};

// Function to dynamically import fragments
const importFragment = (type: string): Promise<any> => {
  return import('@/graphql/fragments/paragraph').then((module: { [key: string]: any }) => module[`${type}Fragment`]); // Add type for module
};

interface ResolveProps {
  data: any[] | null;
  environment: string;
}

export const resolve = async ({ data = [], environment = 'preview' }: ResolveProps): Promise<React.ReactNode[]> => {
  if (!data || !Array.isArray(data)) {
    console.error('Invalid or empty data provided to resolve function');
    return [];
  }

  const unionFragment = await ParagraphUnionFragment;
  const paragraphUnionFragment = readFragment(unionFragment, data);
  const components: React.ReactNode[] = [];

  for (const paragraph of paragraphUnionFragment) {
    const type = paragraph.__typename;

    if (!type) {
      console.warn('Paragraph without __typename encountered:', paragraph);
      continue;
    }

    try {
      const [Component, FragmentType] = await Promise.all([
        importComponent(type),
        importFragment(type),
      ]);

      const typedParagraph = readFragment(FragmentType, paragraph);

      components.push(<Component key={paragraph.id} paragraph={typedParagraph} />);
    } catch (error) {
      console.error(`Failed to load component or fragment for type ${type}:`, error);
      components.push(<pre key={paragraph.id}>{JSON.stringify(paragraph, null, 2)}</pre>);
    }
  }

  return components;
};

export default resolve;
