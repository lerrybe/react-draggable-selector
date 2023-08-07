import React, { useCallback, useEffect, useState } from 'react';
import * as S from './styles';
import '../../styles/global.css';

import {
  areTimeSlotsEqual,
  getTimeSlotMatrix,
  updateCachedSelectedTimeSlots,
} from '../../utils/time';
import {
  getTimeSlotMatrixByDay,
  removeDuplicatesAndSortByDate,
} from '../../utils/date';

import RowLabel from './RowLabel';
import TimeSlots from './TimeSlots';
import ColumnLabel from './ColumnLabel';

import { sampleDates } from '../../data/date';
import { type TimeSlot } from '../../types/time';
import { type DragEventStates, Selection } from '../../types/event';
import { DraggableSelectorProps } from '../../types/draggableSelector';
import {
  DEFAULT_LANG,
  DEFAULT_MODE,
  DEFAULT_TIMEUNIT,
} from '../../constant/options';

const DraggableSelector = React.memo(
  ({
    dates,
    endTime,
    startTime,
    selectedTimeSlots,
    setSelectedTimeSlots,

    mode,
    language,
    timeUnit,
    dateFormat,
    timeFormat,

    width,
    height,
    margin,
    padding,
    minWidth,
    maxWidth,
    minHeight,
    maxHeight,
    slotHeight,
    slotMinWidth,
    slotRowGap,
    slotColumnGap,
    slotBorderStyle,
    slotBorderRadius,
    defaultSlotColor,
    hoveredSlotColor,
    selectedSlotColor,
    disabledSlotColor,

    rowLabelBgColor,
    rowLabelPadding,
    rowLabelBorderRadius,
    rowLabelWidth,
    rowLabelsColor,
    rowLabelsMargin,
    rowLabelsBgColor,
    rowLabelsFontSize,
    rowLabelsFontFamily,
    rowLabelsFontWeight,
    rowLabelsBorderRadius,
    isRowLabelInvisible,

    columnLabelHeight,
    columnLabelBgColor,
    columnLabelPadding,
    columnLabelBorderRadius,
    columnLabelsColor,
    columnLabelsMargin,
    columnLabelsBgColor,
    columnLabelsFontSize,
    columnLabelsFontFamily,
    columnLabelsFontWeight,
    columnLabelsBorderRadius,
    isColumnLabelInvisible,

    scrollWidth,
    scrollColor,
    scrollBgColor,
  }: DraggableSelectorProps) => {
    /* ----- STATES ----- */
    const [selectedDates, setSelectedDates] = useState<Date[]>(
      removeDuplicatesAndSortByDate(dates),
    );
    const [timeSlotMatrix, setTimeSlotMatrix] = useState<TimeSlot[][]>([]);
    const [dragEventStates, setDragEventStates] = useState<DragEventStates>({
      selectionType: null,
      startedTimeSlot: null,
      cachedSelectedTimeSlots: [...selectedTimeSlots],
    });
    const [mockTimeSlotMatrix, setMockTimeSlotMatrix] = useState<TimeSlot[][]>(
      [],
    );
    const [timeSlotMatrixByDay, setTimeSlotMatrixByDay] = useState<
      TimeSlot[][]
    >([]);
    /* ----- STATES ----- */

    /* ----- FUNC related with SELECTION & UPDATING ----- */
    const startSelection = useCallback(
      (startedTimeSlot: TimeSlot, selectedTimeSlots: TimeSlot[]) => {
        const selectedTimeSlot = selectedTimeSlots.find(slot =>
          areTimeSlotsEqual(startedTimeSlot, slot, mode || DEFAULT_MODE),
        );
        setDragEventStates(prev => ({
          ...prev,
          startedTimeSlot: startedTimeSlot,
          selectionType: selectedTimeSlot ? Selection.REMOVE : Selection.ADD,
        }));
      },
      [mode],
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
        if (mode === 'day') {
          updateCachedSelectedTimeSlots({
            mode: 'day',
            endedTimeSlot,
            timeSlotMatrix: mockTimeSlotMatrix,
            dragEventStates,
            selectedTimeSlots,
            setDragEventStates,
            timeSlotMatrixByDay,
          });
        } else {
          updateCachedSelectedTimeSlots({
            mode: 'date',
            endedTimeSlot,
            timeSlotMatrix,
            dragEventStates,
            selectedTimeSlots,
            setDragEventStates,
            timeSlotMatrixByDay,
          });
        }
      },
      [mode, dragEventStates, selectedTimeSlots, timeSlotMatrix],
    );
    /* ----- FUNC related with SELECTION & UPDATING ----- */

    /* ----- EVENT HANDLERS ----- */
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
    /* ----- EVENT HANDLERS ----- */

    /* ----- EFFECTS ----- */
    // Initialize and remove duplicated data when dates changed
    useEffect(() => {
      setSelectedDates(removeDuplicatesAndSortByDate(dates));
    }, [dates]);

    // Initialize data when options changed
    useEffect(() => {
      setDragEventStates({
        selectionType: null,
        startedTimeSlot: null,
        cachedSelectedTimeSlots: [],
      });
      setSelectedTimeSlots([]);
    }, [mode, startTime, endTime, timeUnit]);

    // Initialize data when dates changed
    useEffect(() => {
      if (mode === 'day') {
        setDragEventStates({
          selectionType: null,
          startedTimeSlot: null,
          cachedSelectedTimeSlots: [],
        });
        setSelectedTimeSlots([]);
      }
    }, [mode, dates]);

    // Remove timeSlots if date is not in the selectedDates
    useEffect(() => {
      const filteredTimeSlots = selectedTimeSlots.filter(slot => {
        return selectedDates.some(date => {
          const standardDate = new Date(slot.date);
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

    // Initialize timeSlotMatrix when dates changed
    useEffect(() => {
      const matrix = getTimeSlotMatrix({
        timeUnit: timeUnit || DEFAULT_TIMEUNIT,
        dates: selectedDates,
        startTime: startTime,
        endTime: endTime,
      });
      if (matrix) {
        setTimeSlotMatrix(matrix);
      }
    }, [startTime, endTime, timeUnit, selectedDates]);

    // Initialize timeSlotMatrixByDay when timeSlotMatrix changed
    useEffect(() => {
      const sortedMatrix = getTimeSlotMatrixByDay(timeSlotMatrix);
      if (sortedMatrix) {
        setTimeSlotMatrixByDay(sortedMatrix);
      }
    }, [timeSlotMatrix]);

    // Initialize mockTimeSlotMatrix when dates changed
    useEffect(() => {
      const mockMatrix = getTimeSlotMatrix({
        timeUnit: timeUnit || DEFAULT_TIMEUNIT,
        dates: removeDuplicatesAndSortByDate(sampleDates),
        startTime: startTime,
        endTime: endTime,
      });
      if (mockMatrix) {
        setMockTimeSlotMatrix(mockMatrix);
      }
    }, [startTime, endTime, timeUnit, selectedDates]);

    // Add, Remove event listener
    useEffect(() => {
      document.addEventListener('mouseup', updateSlots);
      return () => {
        document.removeEventListener('mouseup', updateSlots);
      };
    }, [updateSlots]);
    /* ----- EFFECTS ----- */

    return (
      <>
        <S.Container
          $width={width}
          $height={height}
          $margin={margin}
          $padding={padding}
          $minWidth={minWidth}
          $maxWidth={maxWidth}
          $minHeight={minHeight}
          $maxHeight={maxHeight}
          $scrollWidth={scrollWidth}
          $scrollColor={scrollColor}
          $scrollBgColor={scrollBgColor}
        >
          {selectedDates && startTime && endTime && (
            <>
              {!isRowLabelInvisible && (
                <S.LeftContainer $rowLabelWidth={rowLabelWidth}>
                  {!isColumnLabelInvisible && (
                    <S.EmptySlot height={columnLabelHeight} />
                  )}
                  <RowLabel
                    gap={slotRowGap}
                    language={language || DEFAULT_LANG}
                    slotHeight={slotHeight}
                    timeFormat={timeFormat}
                    timeSlots={timeSlotMatrix[0]}
                    rowLabelsColor={rowLabelsColor}
                    rowLabelsMargin={rowLabelsMargin}
                    rowLabelBgColor={rowLabelBgColor}
                    rowLabelPadding={rowLabelPadding}
                    rowLabelsBgColor={rowLabelsBgColor}
                    rowLabelsFontSize={rowLabelsFontSize}
                    rowLabelsFontWeight={rowLabelsFontWeight}
                    rowLabelsFontFamily={rowLabelsFontFamily}
                    rowLabelBorderRadius={rowLabelBorderRadius}
                    rowLabelsBorderRadius={rowLabelsBorderRadius}
                  />
                </S.LeftContainer>
              )}

              <S.RightContainer>
                {!isColumnLabelInvisible && (
                  <ColumnLabel
                    dates={selectedDates}
                    dateFormat={dateFormat}
                    mode={mode || DEFAULT_MODE}
                    language={language || DEFAULT_LANG}
                    gap={slotColumnGap}
                    slotMinWidth={slotMinWidth}
                    columnLabelHeight={columnLabelHeight}
                    columnLabelsColor={columnLabelsColor}
                    columnLabelsMargin={columnLabelsMargin}
                    columnLabelBgColor={columnLabelBgColor}
                    columnLabelPadding={columnLabelPadding}
                    columnLabelsBgColor={columnLabelsBgColor}
                    columnLabelsFontSize={columnLabelsFontSize}
                    columnLabelsFontFamily={columnLabelsFontFamily}
                    columnLabelsFontWeight={columnLabelsFontWeight}
                    columnLabelBorderRadius={columnLabelBorderRadius}
                    columnLabelsBorderRadius={columnLabelsBorderRadius}
                  />
                )}
                <TimeSlots
                  slotRowGap={slotRowGap}
                  slotHeight={slotHeight}
                  mode={mode || DEFAULT_MODE}
                  slotMinWidth={slotMinWidth}
                  slotColumnGap={slotColumnGap}
                  timeSlotMatrix={timeSlotMatrix}
                  slotBorderStyle={slotBorderStyle}
                  hoveredSlotColor={hoveredSlotColor}
                  defaultSlotColor={defaultSlotColor}
                  slotBorderRadius={slotBorderRadius}
                  selectedSlotColor={selectedSlotColor}
                  disabledSlotColor={disabledSlotColor}
                  mockTimeSlotMatrix={mockTimeSlotMatrix}
                  timeSlotMatrixByDay={timeSlotMatrixByDay}
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
  },
);

export default DraggableSelector;
