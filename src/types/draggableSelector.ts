import React from 'react';
import { TimeSlot } from './time.ts';

export interface DraggableSelectorProps {
  /* REQUIRED */
  dates: Date[]; // Required default value: []
  endTime: string;
  startTime: string;
  selectedTimeSlots: TimeSlot[]; // Required default value: []
  setSelectedTimeSlots: React.Dispatch<React.SetStateAction<TimeSlot[]>>;

  /* OPTIONAL */
  timeUnit?: 5 | 10 | 15 | 20 | 30 | 60; // default: 30
  dateFormat?: string;
  timeFormat?: string;
  mode?: 'date' | 'day';
  language?: 'en' | 'ko';

  width?: string;
  height?: string;
  margin?: string;
  padding?: string;
  minWidth?: string;
  maxWidth?: string;
  minHeight?: string;
  maxHeight?: string;
  slotHeight?: string;
  slotMinWidth?: string;
  slotRowGap?: string;
  slotColumnGap?: string;
  defaultSlotColor?: string;
  hoveredSlotColor?: string;
  selectedSlotColor?: string;
  disabledSlotColor?: string;
  slotBorderStyle?: string;
  slotBorderRadius?: string;

  rowLabelWidth?: string;
  rowLabelBgColor?: string;
  rowLabelPadding?: string;
  rowLabelBorderRadius?: string;
  rowLabelsColor?: string;
  rowLabelsMargin?: string;
  rowLabelsBgColor?: string;
  rowLabelsFontSize?: string;
  rowLabelsFontWeight?: number;
  rowLabelsFontFamily?: string;
  rowLabelsBorderRadius?: string;
  isRowLabelInvisible?: boolean;

  columnLabelHeight?: string;
  columnLabelBgColor?: string;
  columnLabelPadding?: string;
  columnLabelBorderRadius?: string;
  columnLabelsColor?: string;
  columnLabelsMargin?: string;
  columnLabelsBgColor?: string;
  columnLabelsFontSize?: string;
  columnLabelsFontFamily?: string;
  columnLabelsFontWeight?: number;
  columnLabelsBorderRadius?: string;
  isColumnLabelInvisible?: boolean;

  scrollWidth?: string;
  scrollColor?: string;
  scrollBgColor?: string;
}
