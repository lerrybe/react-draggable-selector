import type { Meta, StoryObj } from '@storybook/react';

import { ControlRowLabelStyle } from '../components/ControlRowLabelStyle';

const meta = {
  title: 'Using Props/4. control row label style',
  component: ControlRowLabelStyle,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
} satisfies Meta<typeof ControlRowLabelStyle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sample: Story = {
  args: {
    rowLabelWidth: '70px',
    rowLabelBgColor: '#dfe8ff',
    rowLabelPadding: '3px',
    rowLabelBorderRadius: '5px',
    rowLabelsColor: '#4581f1',
    rowLabelsMargin: '0px 5px 0 0',
    rowLabelsFontSize: '10px',
    rowLabelsFontWeight: 600,
    rowLabelsFontFamily: 'GmarketSansMedium',
    rowLabelsBgColor: '#f8f8f8',
    rowLabelsBorderRadius: '5px',
    isRowLabelInvisible: false,
  },
};
