import type { Meta, StoryObj } from '@storybook/react';

import { DraggableSelector } from './Playground';

const meta = {
  title: 'components/DraggableSelector',
  component: DraggableSelector,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: [''],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'padded',
  },
} satisfies Meta<typeof DraggableSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {},
};
