import React from 'react';
import { TimeSlot } from '../../../types/timeInfo';
interface SelectorProps {
    slotWidth: number;
    slotHeight: number;
    slotsMarginTop: number;
    slotsMarginLeft: number;
    maxWidth: string;
    maxHeight: string;
    defaultSlotColor: string;
    selectedSlotColor: string;
    disabledSlotColor: string;
    hoveredSlotColor: string;
    slotsContainerBorder: string;
    slotsContainerBorderRadius: string;
    minTime: string;
    maxTime: string;
    dateFormat: string;
    timeFormat: string;
    mode: 'day' | 'date';
    selectedDates: Date[];
    timeSlotMatrix: TimeSlot[][];
    cachedMatrixByDay: TimeSlot[][];
    selectedTimeSlots: TimeSlot[];
    timeUnit: 5 | 10 | 15 | 20 | 30 | 60;
    setSelectedTimeSlots: React.Dispatch<React.SetStateAction<TimeSlot[]>>;
}
export default function Selector({ mode, slotWidth, slotHeight, slotsMarginTop, slotsMarginLeft, maxWidth, maxHeight, defaultSlotColor, selectedSlotColor, disabledSlotColor, hoveredSlotColor, slotsContainerBorder, slotsContainerBorderRadius, minTime, maxTime, timeUnit, dateFormat, timeFormat, selectedDates, timeSlotMatrix, cachedMatrixByDay, selectedTimeSlots, setSelectedTimeSlots, }: SelectorProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map