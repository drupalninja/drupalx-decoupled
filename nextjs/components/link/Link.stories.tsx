import type { Meta, StoryObj } from '@storybook/react';
import Link from './Link';

const meta: Meta<typeof Link> = {
  title: 'General/Link',
  component: Link,
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Default: Story = {
  args: {
    href: '#',
    className: 'link-primary',
    children: 'Primary link',
  }
};

export const Secondary: Story = {
  args: {
    href: '#',
    className: 'link-secondary',
    children: 'Secondary link',
  }
};

export const Success: Story = {
  args: {
    href: '#',
    className: 'link-success',
    children: 'Success link',
  }
};

export const Danger: Story = {
  args: {
    href: '#',
    className: 'link-danger',
    children: 'Danger link',
  }
};

export const Warning: Story = {
  args: {
    href: '#',
    className: 'link-warning',
    children: 'Warning link',
  }
};

export const Info: Story = {
  args: {
    href: '#',
    className: 'link-info',
    children: 'Info link',
  }
};

export const Light: Story = {
  args: {
    href: '#',
    className: 'link-light',
    children: 'Light link',
  }
};

export const Dark: Story = {
  args: {
    href: '#',
    className: 'link-dark',
    children: 'Dark link',
  }
};
