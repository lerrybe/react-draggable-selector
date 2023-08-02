import type { Meta, StoryObj } from '@storybook/react';

import TimeSelector from '../App.tsx';

const meta = {
  title: 'Example/TimeSelector',
  component: TimeSelector,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof TimeSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedIn: Story = {
  args: {
  },
};

