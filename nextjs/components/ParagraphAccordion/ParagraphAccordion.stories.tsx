import type { Meta, StoryObj } from '@storybook/react';
import ParagraphAccordion from './ParagraphAccordion';

const meta: Meta<typeof ParagraphAccordion> = {
  title: 'Editorial/Paragraph Accordion',
  component: ParagraphAccordion,
  argTypes: {
    modifier: {
      control: 'text',
      description: 'Modifier class for the accordion group',
    },
    paragraph: {
      description: 'FragmentOf<typeof ParagraphAccordionFragment>',
      control: 'object',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ParagraphAccordion>;

export const Default: Story = {
  args: {
    modifier: '',
    paragraph: {
      accordionItem: [
        {
          title: 'Curabitur aliquet quam id dui posuere blandit.',
          body: {
            value: '<p>Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Proin eget tortor risus. Donec rutrum congue leo eget malesuada. Donec sollicitudin molestie malesuada. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.</p>',
          },
          link: {
            uri: 'https://www.google.com',
            title: 'Learn more',
          }
        },
        {
          title: 'Curabitur aliquet quam id dui posuere blandit.',
          body: {
            value: '<p>Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Proin eget tortor risus. Donec rutrum congue leo eget malesuada. Donec sollicitudin molestie malesuada. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.</p>',
          },
          link: {
            uri: 'https://www.google.com',
            title: 'Learn more',
          }
        },
        {
          title: 'Curabitur aliquet quam id dui posuere blandit.',
          body: {
            value: '<p>Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Proin eget tortor risus. Donec rutrum congue leo eget malesuada. Donec sollicitudin molestie malesuada. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.</p>',
          },
          link: {
            uri: 'https://www.google.com',
            title: 'Learn more',
          }
        },
      ],
    } as any,
  },
};
