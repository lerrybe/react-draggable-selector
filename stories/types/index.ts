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
  start: Date;
  end: Date;
}

export interface SampleDraggableSelectorProps {
  /* OPTIONAL */
  dateFormat?: string;
  timeFormat?: string;
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
  rowLabelsColor?: string;
  rowLabelsFontSize?: string;
  isRowLabelInvisible?: boolean;
  columnLabelHeight?: string;
  columnLabelsColor?: string;
  columnLabelsFontSize?: string;
  isColumnLabelInvisible?: boolean;
}
