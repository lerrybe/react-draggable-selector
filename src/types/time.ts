export interface Time {
  endTime: string | null;
  startTime: string | null;
}

export interface TimeSlot {
  date: string;
  startTime: string;
  endTime: string;
}

export type TimeSlotRecord = Record<string, Record<string, TimeSlot>>;
