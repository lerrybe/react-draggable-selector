import { TimeSlot } from './timeInfo';

export enum Selection {
  ADD = 'add',
  REMOVE = 'remove',
}

export interface DragEventStates {
  selectionType: Selection | null;
  startedTimeSlot: TimeSlot | null;
  cachedSelectedTimeSlots: TimeSlot[];
}
