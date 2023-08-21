import React from 'react';
import { TimeSlot } from '../types/time';
import { DragEventStates } from '../types/event';

export type DataContextType = {
  selectedDates: Date[];
  dragEventStates: DragEventStates;

  timeSlotMatrix: TimeSlot[][];
  mockTimeSlotMatrix: TimeSlot[][];
  timeSlotMatrixByDay: TimeSlot[][];

  setSelectedDates: React.Dispatch<React.SetStateAction<Date[]>>;
  setDragEventStates: React.Dispatch<React.SetStateAction<DragEventStates>>;

  setTimeSlotMatrix: React.Dispatch<React.SetStateAction<TimeSlot[][]>>;
  setMockTimeSlotMatrix: React.Dispatch<React.SetStateAction<TimeSlot[][]>>;
  setTimeSlotMatrixByDay: React.Dispatch<React.SetStateAction<TimeSlot[][]>>;
};

export const initialData = {
  selectedDates: [],
  dragEventStates: {
    selectionType: null,
    startedTimeSlot: null,
    cachedSelectedTimeSlots: [],
  },

  timeSlotMatrix: [],
  mockTimeSlotMatrix: [],
  timeSlotMatrixByDay: [],

  setSelectedDates: () => {},
  setDragEventStates: () => {},

  setTimeSlotMatrix: () => {},
  setMockTimeSlotMatrix: () => {},
  setTimeSlotMatrixByDay: () => {},
};
