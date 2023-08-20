import React, { useCallback, useEffect, useState } from 'react';
import * as S from './styles';
import '../../styles/global.css';

import { areTimeSlotsEqual, getTimeSlotMatrix, updateCachedSelectedTimeSlots } from '../../utils/time';
import { getTimeSlotMatrixByDay, removeDuplicatesAndSortByDate } from '../../utils/date';

import RowLabel from './RowLabel';
import TimeSlots from './TimeSlots';
import ColumnLabel from './ColumnLabel';

import { sampleDates } from '../../data/date';
import { type TimeSlot } from '../../types/time';
import { type DragEventStates, Selection } from '../../types/event';
import { DraggableSelectorProps } from '../../types/draggableSelector';
import {
  DEFAULT_IS_SLOT_WIDTH_GROW,
  DEFAULT_LANG,
  DEFAULT_MODE,
  DEFAULT_SLOT_WIDTH,
  DEFAULT_TIMEUNIT,
} from '../../constant/options';
import RowLabelStyleProvider, { useRowLabelStyleContext } from '../../context/RowLabelStyleContext';

const DraggableSelector = React.memo((props: DraggableSelectorProps) => {
  const {
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

    slotWidth,
    slotHeight,
    slotMinWidth,
    slotRowGap,
    slotColumnGap,
    slotBorderStyle,
    slotBorderRadius,
    isSlotWidthGrow,
    defaultSlotColor,
    hoveredSlotColor,
    selectedSlotColor,
    disabledSlotColor,

    rowLabelWidth,

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
  } = props;
  /* ----- STATES ----- */
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [timeSlotMatrix, setTimeSlotMatrix] = useState<TimeSlot[][]>([]);
  const [dragEventStates, setDragEventStates] = useState<DragEventStates>({
    selectionType: null,
    startedTimeSlot: null,
    cachedSelectedTimeSlots: [...selectedTimeSlots],
  });
  const [mockTimeSlotMatrix, setMockTimeSlotMatrix] = useState<TimeSlot[][]>([]);
  const [timeSlotMatrixByDay, setTimeSlotMatrixByDay] = useState<TimeSlot[][]>([]);
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

  // SET RowLabelStyle
  const value = useRowLabelStyleContext()!;
  useEffect(() => {
    value.setGap(props.slotRowGap);
    value.setRowHeight(props.slotHeight);
    value.setRowLabelBgColor(props.rowLabelBgColor);
    value.setRowLabelPadding(props.rowLabelPadding);
    value.setRowLabelBorderRadius(props.rowLabelBorderRadius);
    value.setRowLabelsColor(props.rowLabelsColor);
    value.setRowLabelsMargin(props.rowLabelsMargin);
    value.setRowLabelBgColor(props.rowLabelBgColor);
    value.setRowLabelsFontSize(props.rowLabelsFontSize);
    value.setRowLabelsFontWeight(props.rowLabelsFontWeight);
    value.setRowLabelsFontFamily(props.rowLabelsFontFamily);
    value.setRowLabelsBorderRadius(props.rowLabelsBorderRadius);
  }, [props, value]);
  /* ----- EFFECTS ----- */

  return (
    <RowLabelStyleProvider>
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
        $isSlotWidthGrow={isSlotWidthGrow}
      >
        {selectedDates && startTime && endTime && (
          <>
            {!isRowLabelInvisible && (
              <S.LeftContainer $rowLabelWidth={rowLabelWidth}>
                {!isColumnLabelInvisible && <S.EmptySlot height={columnLabelHeight} />}
                <RowLabel language={language || DEFAULT_LANG} timeFormat={timeFormat} timeSlots={timeSlotMatrix[0]} />
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
                  isSlotWidthGrow={isSlotWidthGrow || DEFAULT_IS_SLOT_WIDTH_GROW}
                  slotWidth={slotWidth || DEFAULT_SLOT_WIDTH}
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
                isSlotWidthGrow={isSlotWidthGrow || DEFAULT_IS_SLOT_WIDTH_GROW}
                slotWidth={slotWidth || DEFAULT_SLOT_WIDTH}
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
                cachedSelectedTimeSlots={dragEventStates.cachedSelectedTimeSlots}
              />
            </S.RightContainer>
          </>
        )}
      </S.Container>
    </RowLabelStyleProvider>
  );
});

export default DraggableSelector;
