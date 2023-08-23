import React from 'react';
import { TimeSlot, TimeSlotRecord } from '../types/timeInfo';
import { DragEventStates } from '../types/domEvent';
export declare const getLabelsFromDates: (dates: Date[], form?: string) => string[];
export declare const getFilteredTimeSlotsByDate: (dates: Date[], timeSlots: TimeSlot[]) => TimeSlot[];
export declare const areTimeSlotsEqual: (a: TimeSlot, b: TimeSlot) => boolean;
export declare const areTimeSlotsEqualByDayAndTime: (a: TimeSlot, b: TimeSlot) => boolean;
export declare const getTimeSlotMatrixByDay: (matrix: TimeSlot[][]) => TimeSlot[][] | undefined;
export declare const getStrTime: (num: number) => string;
export declare const getTimeSlotRecord: ({ dates, minTime: numMinTime, maxTime: numMaxTime, timeUnit, }: {
    dates?: Date[] | undefined;
    minTime: number;
    maxTime: number;
    timeUnit: 5 | 10 | 15 | 20 | 30 | 60;
}) => TimeSlotRecord | undefined;
export declare const getTimeSlotMatrix: (timeSlotRecord: TimeSlotRecord) => TimeSlot[][];
export declare const updateCachedSelectedTimeSlots: ({ endedTimeSlot, timeSlotMatrix, dragEventStates, selectedTimeSlots, setDragEventStates, }: {
    timeSlotMatrix: TimeSlot[][];
    selectedTimeSlots: TimeSlot[];
    endedTimeSlot: TimeSlot | null;
    dragEventStates: DragEventStates;
    setDragEventStates: React.Dispatch<React.SetStateAction<DragEventStates>>;
}) => void;
//# sourceMappingURL=time.d.ts.map