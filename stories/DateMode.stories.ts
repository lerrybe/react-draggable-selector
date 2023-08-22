import type { Meta, StoryObj } from '@storybook/react';
import SampleDateMode from './components/SampleDateMode';

const meta = {
  title: 'Playground/SampleDateMode',
  component: SampleDateMode,
  tags: [''],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof SampleDateMode>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DateMode: Story = {
  args: {
    slotWidth: 62,
    slotHeight: 18,
    slotsMarginTop: 11,
    slotsMarginLeft: 20,
    maxWidth: '536px',
    maxHeight: '452px',
    defaultSlotColor: '#FFFFFF',
    selectedSlotColor: '#FFF5E5',
    disabledSlotColor: '#e1e1e1',
    hoveredSlotColor: '#FFF5E5',
    slotsContainerBorder: '1px solid #8c8d94',
    slotsContainerBorderRadius: '0px',
    dateFormat: 'MM.DD',
    timeFormat: 'HH:mm A',
  },
};
