import { TimeSlot } from '../../../types/timeInfo';
interface TimeSlotsProps {
    mode: 'day' | 'date';
    slotWidth: number;
    slotHeight: number;
    defaultSlotColor: string;
    selectedSlotColor: string;
    disabledSlotColor: string;
    hoveredSlotColor: string;
    slotsContainerBorder: string;
    slotsContainerBorderRadius: string;
    timeSlotMatrix?: TimeSlot[][];
    cachedMatrixByDay: TimeSlot[][];
    cachedSelectedTimeSlots?: TimeSlot[];
    handleMouseUp: (timeSlot: TimeSlot) => void;
    handleMouseDown: (timeSlot: TimeSlot) => void;
    handleMouseEnter: (timeSlot: TimeSlot) => void;
}
declare const TimeSlots: ({ mode, slotWidth, slotHeight, defaultSlotColor, selectedSlotColor, disabledSlotColor, hoveredSlotColor, slotsContainerBorder, slotsContainerBorderRadius, timeSlotMatrix, cachedMatrixByDay, handleMouseUp, handleMouseDown, handleMouseEnter, cachedSelectedTimeSlots, }: TimeSlotsProps) => import("react/jsx-runtime").JSX.Element;
export default TimeSlots;
//# sourceMappingURL=index.d.ts.map