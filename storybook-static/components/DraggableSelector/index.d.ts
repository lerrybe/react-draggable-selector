import React from 'react';
import { TimeSlot } from '../../types/timeInfo';
export interface DraggableSelectorProps {
    minTime: number;
    maxTime: number;
    dates: Date[];
    dateFormat?: string;
    timeFormat?: string;
    mode?: 'day' | 'date';
    timeSlots: TimeSlot[];
    setTimeSlots: React.Dispatch<React.SetStateAction<TimeSlot[]>>;
    timeUnit?: 5 | 10 | 15 | 20 | 30 | 60;
    slotWidth?: number;
    slotHeight?: number;
    slotsMarginTop?: number;
    slotsMarginLeft?: number;
    maxWidth?: string;
    maxHeight?: string;
    defaultSlotColor?: string;
    selectedSlotColor?: string;
    disabledSlotColor?: string;
    hoveredSlotColor?: string;
    slotsContainerBorder?: string;
    slotsContainerBorderRadius?: string;
}
export default function DraggableSelector({ minTime, maxTime, timeUnit, dateFormat, timeFormat, timeSlots, setTimeSlots, mode, dates, slotWidth, slotHeight, slotsMarginTop, slotsMarginLeft, maxWidth, maxHeight, defaultSlotColor, selectedSlotColor, disabledSlotColor, hoveredSlotColor, slotsContainerBorder, slotsContainerBorderRadius, }: DraggableSelectorProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=index.d.ts.map