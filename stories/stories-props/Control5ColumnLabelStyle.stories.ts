import type { Meta, StoryObj } from '@storybook/react';

import { ControlColumnLabelStyle } from '../components/ControlColumnLabelStyle';

const meta = {
  title: 'Using Props/5. control column label style',
  component: ControlColumnLabelStyle,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
} satisfies Meta<typeof ControlColumnLabelStyle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sample: Story = {
  args: {
    columnLabelHeight: '30px',
    columnLabelBgColor: '#dfe8ff',
    columnLabelPadding: '3px',
    columnLabelBorderRadius: '5px',
    columnLabelsColor: '#4581f1',
    columnLabelsMargin: '0px 0 5px 0',
    columnLabelsFontSize: '15px',
    columnLabelsFontWeight: 600,
    columnLabelsFontFamily: 'GmarketSansMedium',
    columnLabelsBgColor: '#f8f8f8',
    columnLabelsBorderRadius: '5px',
    isColumnLabelInvisible: false,
  },
};
