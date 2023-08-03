import React, { useCallback, useEffect, useState } from 'react';
import * as S from './styles';
import { type TimeSlot } from '../../types/time';
import { type DragEventStates, Selection } from '../../types/event';

import {
  areTimeSlotsEqual,
  getTimeSlotMatrix,
  updateCachedSelectedTimeSlots,
} from '../../utils/time';
import { changeDateStringFormat, getSortedDates } from '../../utils/date.ts';

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
  timeUnit?: 5 | 10 | 15 | 20 | 30 | 60; // opt, default: 30
  slotHeight?: string;
  slotMinWidth?: string;
  slotRowGap?: string;
  slotColumnGap?: string;
  defaultSlotColor?: string;
  selectedSlotColor?: string;
  hoveredSlotColor?: string;
  slotBorderStyle?: string;
  slotBorderRadius?: string;
  width?: string;
  height?: string;
  maxWidth?: string;
  maxHeight?: string;

  rowLabelWidth?: string;
  isRowLabelInvisible?: boolean;
  rowLabelsBgColor?: string;
  rowLabelsBorderRadius?: string;
  isColumnLabelInVisible?: boolean;
  columnLabelsBgColor?: string;
  columnLabelsBorderRadius?: string;

  rowLabelsColor?: string;
  rowLabelsFontWeight?: number;
  rowLabelsMargin?: string;
  rowLabelsFontSize?: string;
  rowLabelsFontFamily?: string;
  rowLabelBorderRadius?: string;
  rowLabelBgColor?: string;
  rowLabelPadding?: string;

  columnLabelsColor?: string;
  columnLabelsFontWeight?: number;
  columnLabelsMargin?: string;
  columnLabelsFontSize?: string;
  columnLabelsFontFamily?: string;

  columnLabelBorderRadius?: string;
  columnLabelBgColor?: string;
  columnLabelPadding?: string;

  scrollColor?: string;
  scrollBgColor?: string;
  scrollWidth?: string;
}

export default function DraggableSelector({
  startTime,
  endTime,
  selectedDates,
  selectedTimeSlots,
  setSelectedTimeSlots,

  timeUnit,
  slotHeight,
  slotMinWidth,
  slotRowGap,
  slotColumnGap,
  defaultSlotColor,
  selectedSlotColor,
  hoveredSlotColor,
  slotBorderStyle,
  slotBorderRadius,
  width,
  height,
  maxWidth,
  maxHeight,
  rowLabelWidth,

  isRowLabelInvisible,
  rowLabelsBgColor,
  rowLabelsBorderRadius,
  isColumnLabelInVisible,
  columnLabelsBgColor,
  columnLabelsBorderRadius,

  rowLabelsColor,
  rowLabelsFontWeight,
  rowLabelsMargin,
  rowLabelsFontSize,
  rowLabelsFontFamily,
  rowLabelBorderRadius,
  rowLabelBgColor,
  rowLabelPadding,

  columnLabelsColor,
  columnLabelsFontWeight,
  columnLabelsMargin,
  columnLabelsFontSize,
  columnLabelsFontFamily,
  columnLabelBorderRadius,
  columnLabelBgColor,
  columnLabelPadding,

  scrollColor,
  scrollBgColor,
  scrollWidth,
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

  /* DATA INITIALIZE for OPTIONS */
  useEffect(() => {
    setSelectedTimeSlots([]);
    setDragEventStates({
      selectionType: null,
      startedTimeSlot: null,
      cachedSelectedTimeSlots: [],
    });
  }, [startTime, endTime, timeUnit]);

  /* filter timeSlots if dates changed */
  useEffect(() => {
    // If the date of the corresponding slot is not in the selectedDates
    // it is removed while rotating the elements in the selectedTimeSlot array.
    const filteredTimeSlots = selectedTimeSlots.filter(slot => {
      return selectedDates.some(date => {
        const standardDate = new Date(changeDateStringFormat(slot.date));
        return (
          standardDate.getFullYear() === date.getFullYear() &&
          standardDate.getMonth() === date.getMonth() &&
          standardDate.getDate() === date.getDate()
        );
      });
    });
    setSelectedTimeSlots(filteredTimeSlots);
    setDragEventStates(prev => ({
      ...prev,
      cachedSelectedTimeSlots: filteredTimeSlots,
    }));
  }, [selectedDates]);

  useEffect(() => {
    document.addEventListener('mouseup', updateSlots);
    return () => {
      document.removeEventListener('mouseup', updateSlots);
    };
  }, [updateSlots]);

  useEffect(() => {
    const matrix = getTimeSlotMatrix({
      timeUnit: timeUnit || 30,
      dates: getSortedDates(selectedDates),
      startTime: startTime,
      endTime: endTime,
    });
    if (matrix) {
      setTimeSlotMatrix(matrix);
    }
  }, [selectedDates, startTime, endTime, timeUnit]);

  return (
    <>
      <S.Container
        $width={width}
        $height={height}
        $maxWidth={maxWidth}
        $maxHeight={maxHeight}
        $scrollColor={scrollColor}
        $scrollBgColor={scrollBgColor}
        $scrollWidth={scrollWidth}
      >
        {selectedDates && startTime && endTime && (
          <>
            {!isRowLabelInvisible && (
              <S.LeftContainer $rowLabelWidth={rowLabelWidth}>
                {!isColumnLabelInVisible && <S.EmptySlot height={slotHeight} />}
                <RowLabel
                  gap={slotRowGap}
                  slotHeight={slotHeight}
                  timeSlots={timeSlotMatrix[0]}
                  rowLabelsBgColor={rowLabelsBgColor}
                  rowLabelsBorderRadius={rowLabelsBorderRadius}
                  rowLabelsColor={rowLabelsColor}
                  rowLabelsFontWeight={rowLabelsFontWeight}
                  rowLabelsMargin={rowLabelsMargin}
                  rowLabelsFontSize={rowLabelsFontSize}
                  rowLabelsFontFamily={rowLabelsFontFamily}
                  rowLabelBorderRadius={rowLabelBorderRadius}
                  rowLabelBgColor={rowLabelBgColor}
                  rowLabelPadding={rowLabelPadding}
                />
              </S.LeftContainer>
            )}

            <S.RightContainer>
              {!isColumnLabelInVisible && (
                <ColumnLabel
                  gap={slotColumnGap}
                  slotHeight={slotHeight}
                  slotMinWidth={slotMinWidth}
                  dates={getSortedDates(selectedDates)}
                  columnLabelsBgColor={columnLabelsBgColor}
                  columnLabelsBorderRadius={columnLabelsBorderRadius}
                  columnLabelsColor={columnLabelsColor}
                  columnLabelsFontWeight={columnLabelsFontWeight}
                  columnLabelsMargin={columnLabelsMargin}
                  columnLabelsFontSize={columnLabelsFontSize}
                  columnLabelsFontFamily={columnLabelsFontFamily}
                  columnLabelBorderRadius={columnLabelBorderRadius}
                  columnLabelBgColor={columnLabelBgColor}
                  columnLabelPadding={columnLabelPadding}
                />
              )}

              <TimeSlots
                slotRowGap={slotRowGap}
                slotColumnGap={slotColumnGap}
                slotHeight={slotHeight}
                slotMinWidth={slotMinWidth}
                hoveredSlotColor={hoveredSlotColor}
                defaultSlotColor={defaultSlotColor}
                selectedSlotColor={selectedSlotColor}
                slotBorderStyle={slotBorderStyle}
                slotBorderRadius={slotBorderRadius}
                timeSlotMatrix={timeSlotMatrix}
                handleMouseUp={handleMouseUp}
                handleMouseDown={handleMouseDown}
                handleMouseEnter={handleMouseEnter}
                cachedSelectedTimeSlots={
                  dragEventStates.cachedSelectedTimeSlots
                }
              />
            </S.RightContainer>
          </>
        )}
      </S.Container>
    </>
  );
}
