import type { Meta, StoryObj } from '@storybook/react';

import { ControlSlotStyle } from '../components/ControlSlotStyle';

const meta = {
  title: 'Using Props/3. control slot (cell) style',
  component: ControlSlotStyle,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
} satisfies Meta<typeof ControlSlotStyle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sample: Story = {
  args: {
    slotRowGap: '3px',
    slotColumnGap: '3px',
    slotHeight: '40px',
    slotBorderRadius: '2px',
    slotBorderStyle: '1px solid #e1e1e1',
    defaultSlotColor: '#ffffff',
    hoveredSlotColor: '#ffb6a1',
    selectedSlotColor: '#ff6c40',
  },
};
