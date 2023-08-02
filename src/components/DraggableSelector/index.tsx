import React, { useCallback, useEffect, useState } from 'react';
import S from './DraggableSelector.module.css';
import { type TimeSlot } from '../../types/time';
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
  /* REQUIRED */
  startTime: string;
  endTime: string;
  selectedDates: Date[]; // Required default value: []
  selectedTimeSlots: TimeSlot[]; // Required default value: []
  setSelectedTimeSlots: React.Dispatch<React.SetStateAction<TimeSlot[]>>;

  /* OPTIONAL */
  mode?: 'date' | 'day'; // default: 'date'
  timeUnit?: 5 | 10 | 15 | 20 | 30 | 60; // opt, default: 30
  slotWidth?: number;
  slotHeight?: number;
  defaultSlotColor?: string;
  selectedSlotColor?: string;
  hoveredSlotColor?: string;
  slotRowGap?: number;
  slotColumnGap?: number;
  slotBorderStyle?: string; // '1px solid #000'

  maxWidth?: number;
  maxHeight?: number;

  columnLabelMargin?: string;
  columnLabelFontSize?: number;
  columnLabelFontFamily?: string;
  isColumnLabelVisible?: boolean;

  rowLabelMargin?: string;
  rowLabelFontSize?: number;
  rowLabelFontFamily?: string;
  isRowLabelVisible?: boolean;
}

export default function DraggableSelector({
  startTime,
  endTime,
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
      startTime: startTime,
      endTime: endTime,
    });
    if (matrix) {
      setTimeSlotMatrix(matrix);
    }
  }, [selectedDates, startTime, endTime]);

  return (
    <div>
      <div style={{ display: 'flex' }}>
        {selectedDates && startTime && endTime && (
          <div>
            <li className={S.label} />
            <RowLabel timeSlots={timeSlotMatrix[0]} />
          </div>
        )}
        <div>
          {selectedDates && startTime && endTime && (
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
    </div>
  );
}
