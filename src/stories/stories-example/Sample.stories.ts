import type { Meta, StoryObj } from '@storybook/react';

import { SampleDraggableSelector } from '../components/Sample';

const meta = {
  title: 'Example/DraggableSelector',
  component: SampleDraggableSelector,
  tags: [''],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof SampleDraggableSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sample: Story = {
  args: {
    dateFormat: 'M/D',
    timeFormat: 'HH:mm A',
    slotHeight: '30px',
    slotMinWidth: '30px',
    slotRowGap: '3px',
    slotColumnGap: '3px',
    slotBorderRadius: '2px',
    slotBorderStyle: 'none',
    defaultSlotColor: '#f1f1f1',
    hoveredSlotColor: '#cbcbcb',
    selectedSlotColor: '#3f3f3f',
    disabledSlotColor: '#939393',
    isRowLabelInvisible: false,
    isColumnLabelInvisible: false,
    rowLabelWidth: '68px',
    columnLabelHeight: '36px',
    rowLabelsColor: '#7a7a7a',
    columnLabelsColor: '#7a7a7a',
    rowLabelsFontSize: '12px',
    columnLabelsFontSize: '15px',
  },
};
