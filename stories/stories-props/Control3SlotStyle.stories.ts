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
    slotWidth: '40px',
    slotHeight: '40px',
    slotColumnGap: '3px',
    slotMinWidth: '40px',
    defaultSlotColor: '#ffffff',
    hoveredSlotColor: '#ffb6a1',
    selectedSlotColor: '#ff6c40',
    isCursorPointer: false,
    isSlotWidthGrow: true,
    slotBorderRadius: '2px',
    slotBorderStyle: '1px solid #e1e1e1',
    slotContainerBorderStyle: '1px solid #000',
  },
};
