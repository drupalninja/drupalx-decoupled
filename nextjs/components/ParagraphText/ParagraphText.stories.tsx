import ParagraphText from './ParagraphText';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ParagraphText> = {
  title: 'Editorial/Paragraph Text',
  component: ParagraphText,
  argTypes: {
    paragraph: {
      description: 'ParagraphText fragment data',
      control: 'object',
    },
    modifier: {
      description: 'Define the Text Block modifier class.',
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ParagraphText>;

export const Default: Story = {
  args: {
    modifier: 'col-10 p-4',
    paragraph: {
      title: 'Title Lorem Ipsum Dolor',
      body: {
        value: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mauris mi, aliquam in orci at, finibus malesuada elit. Vivamus ex ante, imperdiet nec odio ac, sollicitudin fermentum velit. Nunc vestibulum massa est, eu auctor libero pellentesque eu. Cras id augue a lacus imperdiet convallis dictum vel diam. Fusce ut ex ac sem condimentum ornare. Nam at rutrum enim. Quisque convallis augue in nisi interdum, ac suscipit elit sollicitudin.</p><p>Nulla velit purus, varius quis velit aliquet, lobortis venenatis mauris. In non ligula eget ex semper pulvinar. Aliquam aliquet hendrerit auctor. Duis bibendum placerat risus, non commodo magna ornare id. Morbi eget nulla hendrerit, molestie nisl eget, semper odio. Mauris mollis risus sit amet ligula mattis vehicula. Donec maximus condimentum lacus, quis porttitor risus fermentum id. Duis semper neque in interdum pulvinar. Nam venenatis interdum libero. Proin dictum blandit ante sollicitudin laoreet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas in pharetra ligula.</p>',
      },
      link: {
        url: '#',
        title: 'Read more',
      },
    },
  }
};