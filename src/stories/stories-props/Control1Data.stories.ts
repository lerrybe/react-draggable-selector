import type { Meta, StoryObj } from '@storybook/react';

import { ControlData } from '../components/ControlData';

const meta = {
  title: 'Using Props/1. control core data',
  component: ControlData,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    startTime: {
      control: 'select',
      options: ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
    },
    endTime: {
      control: 'select',
      options: ['16:00', '17:00', '18:00', '19:00', '20:00', '21:00'],
    },
  },
} satisfies Meta<typeof ControlData>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sample: Story = {
  args: {
    startTime: '13:00',
    endTime: '16:00',
    timeUnit: 30,
    mode: 'date',
    language: 'en',
    dateFormat: 'M/D',
    timeFormat: 'HH:mm A',
  },
};
