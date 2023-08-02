import React, { useCallback, useEffect, useState } from 'react';
import * as S from './styles';
import { type Time, type TimeSlot } from '../../types/time';
import { type DragEventStates, Selection } from '../../types/event';

import {
  areTimeSlotsEqual,
  getTimeSlotMatrix,
  updateCachedSelectedTimeSlots,
} from '../../utils/time';
import { getSortedDates } from '../../utils/date.ts';

import RowLabel from './RowLabel';
import TimeSlots from './TimeSlots';
import ColumnLabel from './ColumnLabel';

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
  const [timeSlotMatrix, setTimeSlotMatrix] = useState<TimeSlot[][]>([]);
  const [dragEventStates, setDragEventStates] = useState<DragEventStates>({
    selectionType: null,
    startedTimeSlot: null,
    cachedSelectedTimeSlots: [...selectedTimeSlots],
  });

  /* FUNCTIONS */
  const startSelection = useCallback(
    (startedTimeSlot: TimeSlot, selectedTimeSlots: TimeSlot[]) => {
      const selectedTimeSlot = selectedTimeSlots.find(slot =>
        areTimeSlotsEqual(startedTimeSlot, slot),
      );
      setDragEventStates(prev => ({
        ...prev,
        startedTimeSlot: startedTimeSlot,
        selectionType: selectedTimeSlot ? Selection.REMOVE : Selection.ADD,
      }));
    },
    [],
  );

  const updateSlots = useCallback(() => {
    setSelectedTimeSlots(dragEventStates.cachedSelectedTimeSlots);
    setDragEventStates(prev => ({
      ...prev,
      selectionType: null,
      startedTimeSlot: null,
    }));
  }, [dragEventStates.cachedSelectedTimeSlots, setSelectedTimeSlots]);

  const updateCache = useCallback(
    (endedTimeSlot: TimeSlot) => {
      updateCachedSelectedTimeSlots({
        endedTimeSlot,
        timeSlotMatrix,
        dragEventStates,
        selectedTimeSlots,
        setDragEventStates,
      });
    },
    [dragEventStates, selectedTimeSlots, timeSlotMatrix],
  );

  /* HANDLERS */
  const handleMouseUp = useCallback(
    (endedTimeSlot: TimeSlot) => {
      updateCache(endedTimeSlot);
    },
    [updateCache],
  );
  const handleMouseEnter = useCallback(
    (endedTimeSlot: TimeSlot) => {
      updateCache(endedTimeSlot);
    },
    [updateCache],
  );
  const handleMouseDown = useCallback(
    (startedTimeSlot: TimeSlot) => {
      startSelection(startedTimeSlot, selectedTimeSlots);
    },
    [selectedTimeSlots, startSelection],
  );

  /* EFFECTS */
  useEffect(() => {
    document.addEventListener('mouseup', updateSlots);
    return () => {
      document.removeEventListener('mouseup', updateSlots);
    };
  }, [updateSlots]);

  useEffect(() => {
    const matrix = getTimeSlotMatrix({
      timeUnit: 30,
      dates: getSortedDates(selectedDates),
      startTime: selectedTime?.startTime,
      endTime: selectedTime?.endTime,
    });
    if (matrix) {
      setTimeSlotMatrix(matrix);
    }
  }, [selectedDates, selectedTime?.startTime, selectedTime?.endTime]);

  return (
    <S.Wrapper>
      <div style={{ display: 'flex' }}>
        {selectedDates && selectedTime?.endTime && selectedTime?.startTime && (
          <div>
            <S.Label />
            <RowLabel timeSlots={timeSlotMatrix[0]} />
          </div>
        )}
        <div>
          {selectedDates &&
            selectedTime?.endTime &&
            selectedTime?.startTime && (
              <ColumnLabel dates={getSortedDates(selectedDates)} />
            )}
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
