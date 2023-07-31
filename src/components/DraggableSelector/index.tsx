import * as S from "./styles";
import React, { useEffect, useState } from "react";

import {
  type Time,
  type TimeSlot,
  // type TimeSlotRecord,
} from "../../types/time";
import { type DragEventStates, Selection } from "../../types/event";

import {
  areTimeSlotsEqual,
  getTimeSlotMatrix,
  getTimeSlotRecord,
  updateCachedSelectedTimeSlots,
} from "../../utils/time";

import TimeLabel from "./TimeLabel";
import DateLabel from "./DateLabel";
import TimeSlots from "./TimeSlots";

interface DraggableSelectorProps {
  selectedDates: Date[];
  selectedTime: Time | null;
  selectedTimeSlots: TimeSlot[];
  setSelectedTimeSlots: React.Dispatch<React.SetStateAction<TimeSlot[]>>;
}

export default function DraggableSelector({
                                            selectedTime,
                                            selectedDates,
                                            selectedTimeSlots,
                                            setSelectedTimeSlots,
                                          }: DraggableSelectorProps) {
  /* STATES */
  const [dragEventStates, setDragEventStates] = useState<DragEventStates>({
    selectionType: null,
    startedTimeSlot: null,
    cachedSelectedTimeSlots: [...selectedTimeSlots],
  });

  const [timeSlotMatrix, setTimeSlotMatrix] = useState<TimeSlot[][]>([]);
  // TODO: manage data with Record
  // const [timeSlotRecord, setTimeSlotRecord] = useState<TimeSlotRecord>();

  const actions = {
    startSelection: (
      startedTimeSlot: TimeSlot,
      selectedTimeSlots: TimeSlot[]
    ) => {
      const selectedTimeSlot = selectedTimeSlots.find((slot) =>
        areTimeSlotsEqual(startedTimeSlot, slot)
      );
      setDragEventStates((prev) => ({
        ...prev,
        startedTimeSlot: startedTimeSlot,
        selectionType: selectedTimeSlot ? Selection.REMOVE : Selection.ADD,
      }));
    },
    updateData: () => {
      setSelectedTimeSlots(dragEventStates.cachedSelectedTimeSlots);
      setDragEventStates((prev) => ({
        ...prev,
        selectionType: null,
        startedTimeSlot: null,
      }));
    },
    updateCachedSelectedTimeSlots: (endedTimeSlot: TimeSlot) => {
      updateCachedSelectedTimeSlots({
        endedTimeSlot,
        timeSlotMatrix,
        dragEventStates,
        selectedTimeSlots,
        setDragEventStates,
      });
    },
  };

  const handlers = {
    handleMouseUp: (endedTimeSlot: TimeSlot) => {
      actions.updateCachedSelectedTimeSlots(endedTimeSlot);
    },
    handleMouseEnter: (endedTimeSlot: TimeSlot) => {
      actions.updateCachedSelectedTimeSlots(endedTimeSlot);
    },
    handleMouseDown: (startedTimeSlot: TimeSlot) => {
      actions.startSelection(startedTimeSlot, selectedTimeSlots);
    },
  };

  /* EFFECTS */
  useEffect(() => {
    document.addEventListener("mouseup", actions.updateData);
    return () => {
      document.removeEventListener("mouseup", actions.updateData);
    };
  }, [actions.updateData]);

  useEffect(() => {
    const record = getTimeSlotRecord({
      timeUnit: 30,
      dates: selectedDates,
      startTime: selectedTime?.startTime,
      endTime: selectedTime?.endTime,
    });
    if (record) {
      // setTimeSlotRecord(record);
      setTimeSlotMatrix(getTimeSlotMatrix(record));
    }
  }, [selectedDates, selectedTime?.startTime, selectedTime?.endTime]);

  return (
    <S.Wrapper>
      <div style={{ display: "flex" }}>
        {selectedDates && selectedTime?.startTime && selectedTime?.endTime && (
          <div>
            <S.Label>시간</S.Label>
            <TimeLabel timeSlots={timeSlotMatrix[0]} />
          </div>
        )}
        <div>
          {selectedDates &&
            selectedTime?.startTime &&
            selectedTime?.endTime && <DateLabel dates={selectedDates} />}
          <TimeSlots
            timeSlotMatrix={timeSlotMatrix}
            handleMouseUp={handlers.handleMouseUp}
            handleMouseDown={handlers.handleMouseDown}
            handleMouseEnter={handlers.handleMouseEnter}
            cachedSelectedTimeSlots={dragEventStates.cachedSelectedTimeSlots}
          />
        </div>
      </div>
    </S.Wrapper>
  );
}
