import dynamic from 'next/dynamic';

// Type for component props
export interface ParagraphBase {
  __typename: string;
  id: string;
}

type ParagraphProps<T extends ParagraphBase = ParagraphBase> = {
  paragraph: T;
};

// Type for dynamic component import
type DynamicComponentType = React.ComponentType<ParagraphProps>;

// Function to dynamically import components
const importComponent = (type: string): Promise<DynamicComponentType> => {
  const formattedType = type.replace(/^Paragraph/, '');
  const DynamicComponent = dynamic(() => import(`@/components/paragraphs/Paragraph${formattedType}`));
  return Promise.resolve(DynamicComponent as DynamicComponentType);
};

// Function to dynamically import fragments
const importFragment = async (type: string) => {
  const paragraphModule = await import('@/graphql/fragments/paragraph');
  const fragmentKey = `${type}Fragment` as keyof typeof paragraphModule;
  return paragraphModule[fragmentKey];
};

interface ResolveProps {
  data: ParagraphBase[] | null;
  environment?: string;
}

export const resolve = async ({ data = [], environment = 'preview' }: ResolveProps): Promise<React.ReactNode[]> => {
  if (!data || !Array.isArray(data)) {
    console.error('Invalid or empty data provided to resolve function');
    return [];
  }

  const components: React.ReactNode[] = [];

  for (const paragraph of data) {
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

      // Use the paragraph directly
      components.push(<Component key={paragraph.id} paragraph={paragraph} />);
    } catch (error) {
      console.error(`Failed to load component or fragment for type ${type}:`, error);
      components.push(<pre key={paragraph.id}>{JSON.stringify(paragraph, null, 2)}</pre>);
    }
  }

  return components;
};

export default resolve;
