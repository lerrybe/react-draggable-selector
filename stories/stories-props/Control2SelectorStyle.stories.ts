import type { Meta, StoryObj } from '@storybook/react';

import { ControlSelectorStyle } from '../components/ControlSelectorStyle';

const meta = {
  title: 'Using Props/2. control selector style',
  component: ControlSelectorStyle,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    scrollColor: { control: 'color' },
    scrollBgColor: { control: 'color' },
  },
} satisfies Meta<typeof ControlSelectorStyle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sample: Story = {
  args: {
    width: 'auto',
    height: '200px',
    margin: '2px 4px',
    padding: '2px 4px',
    scrollColor: '#4e8dfd',
    scrollBgColor: '#dfe7fc',
    scrollWidth: '3px',
  },
};
