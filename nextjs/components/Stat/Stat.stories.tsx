import { Meta, StoryObj } from '@storybook/react';
import Stat from './Stat';
import './Stat.scss';

const meta: Meta<typeof Stat> = {
  title: 'General/Stat',
  component: Stat,
  argTypes: {
    media: { control: 'text' },
    heading: { control: 'text' },
    body: { control: 'text' },
    modifier: { control: 'text' }
  }
};

type Story = StoryObj<typeof Stat>;
export default meta;

export const Default: Story = {
  args: {
    media: <span className="material-symbols-outlined display-1">monitoring</span>,
    heading: 'This is small headling',
    body: 'Vestibulum fringilla pede sit amet augue. Nullam nulla eros, ultricies sit amet, nonummy id, imperdiet feugiat, pede.',
    modifier: 'col-4'
  }
};
