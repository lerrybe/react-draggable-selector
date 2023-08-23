import { TimeSlot } from './timeInfo';
export declare enum Selection {
    ADD = "add",
    REMOVE = "remove"
}
export interface DragEventStates {
    selectionType: Selection | null;
    startedTimeSlot: TimeSlot | null;
    cachedSelectedTimeSlots: TimeSlot[];
}
//# sourceMappingURL=domEvent.d.ts.map