import * as S from "./styles";
import React, { useEffect, useState } from "react";

import {
  type Time,
  type TimeSlot,
} from "../../types/time";
import { type DragEventStates, Selection } from "../../types/event";

import {
  areTimeSlotsEqual,
  getTimeSlotMatrix,
  updateCachedSelectedTimeSlots,
} from "../../utils/time";

import TimeSlots from "./TimeSlots";
import RowLabel from "./RowLabel";
import ColumnLabel from "./ColumnLabel";

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

  /* FUNCTIONS */
  const startSelection = (
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
  };
  const updateSlots = () => {
    setSelectedTimeSlots(dragEventStates.cachedSelectedTimeSlots);
    setDragEventStates((prev) => ({
      ...prev,
      selectionType: null,
      startedTimeSlot: null,
    }));
  };

  const updateCache = (endedTimeSlot: TimeSlot) => {
    updateCachedSelectedTimeSlots({
      endedTimeSlot,
      timeSlotMatrix,
      dragEventStates,
      selectedTimeSlots,
      setDragEventStates,
    });
  };

  /* HANDLERS */
  const handleMouseUp = (endedTimeSlot: TimeSlot) => {
    updateCache(endedTimeSlot);
  };
  const handleMouseEnter = (endedTimeSlot: TimeSlot) => {
    updateCache(endedTimeSlot);
  };
  const handleMouseDown = (startedTimeSlot: TimeSlot) => {
    startSelection(startedTimeSlot, selectedTimeSlots);
  };

  /* EFFECTS */
  useEffect(() => {
    document.addEventListener("mouseup", updateSlots);
    return () => {
      document.removeEventListener("mouseup", updateSlots);
    };
  }, [updateSlots]);

  useEffect(() => {
    const matrix = getTimeSlotMatrix({
      timeUnit: 30,
      dates: selectedDates,
      startTime: selectedTime?.startTime,
      endTime: selectedTime?.endTime,
    });
    if (matrix) {
      setTimeSlotMatrix(matrix);
    }
  }, [selectedDates, selectedTime?.startTime, selectedTime?.endTime]);

  return (
    <S.Wrapper>
      <div style={{ display: "flex" }}>
        {selectedDates && selectedTime?.startTime && selectedTime?.endTime && (
          <div>
            <S.Label />
            <RowLabel timeSlots={timeSlotMatrix[0]} />
          </div>
        )}
        <div>
          {selectedDates &&
            selectedTime?.startTime &&
            selectedTime?.endTime && <ColumnLabel dates={selectedDates} />}
          <TimeSlots
            timeSlotMatrix={timeSlotMatrix}
            handleMouseUp={handleMouseUp}
            handleMouseDown={handleMouseDown}
            handleMouseEnter={handleMouseEnter}
            cachedSelectedTimeSlots={dragEventStates.cachedSelectedTimeSlots}
          />
        </div>
      </div>
    </S.Wrapper>
  );
}
