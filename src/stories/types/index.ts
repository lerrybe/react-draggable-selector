import React from 'react';

export enum Day {
  SUN = 'SUN',
  MON = 'MON',
  TUE = 'TUE',
  WED = 'WED',
  THU = 'THU',
  FRI = 'FRI',
  SAT = 'SAT',
}

export enum TimeUnit {
  FIVE = 5,
  TEN = 10,
  FIFTEEN = 15,
  TWENTY = 20,
  THIRTY = 30,
  SIXTY = 60,
}

export enum Mode {
  DATE = 'date',
  DAY = 'day',
}

export enum Language {
  EN = 'en',
  KO = 'ko',
}

export interface TimeSlot {
  date: string;
  startTime: string;
  endTime: string;
  day: Day;
}

export interface SampleDraggableSelectorProps {
  dates?: Date[];
  endTime?: string;
  startTime?: string;
  selectedTimeSlots?: TimeSlot[];
  setSelectedTimeSlots?: React.Dispatch<React.SetStateAction<TimeSlot[]>>;

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
  isColumnLabelInVisible?: boolean;

  scrollWidth?: string;
  scrollColor?: string;
  scrollBgColor?: string;
}
