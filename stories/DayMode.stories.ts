import type { Meta, StoryObj } from '@storybook/react';
import SampleDayMode from './components/SampleDayMode';

const meta = {
  title: 'Playground/SampleDayMode',
  component: SampleDayMode,
  tags: [''],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof SampleDayMode>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DateMode: Story = {
  args: {
    slotWidth: 62,
    slotHeight: 18,
    slotsMarginTop: 11,
    slotsMarginLeft: 20,
    maxWidth: '546px',
    maxHeight: '452px',
    defaultSlotColor: '#FFFFFF',
    selectedSlotColor: '#b3c6d3',
    disabledSlotColor: '#e1e1e1',
    hoveredSlotColor: '#eef2f6',
    slotsContainerBorder: '1px solid #8c8d94',
    slotsContainerBorderRadius: '0px',
    dateFormat: 'MM.DD',
    timeFormat: 'HH:mm A',
  },
};
