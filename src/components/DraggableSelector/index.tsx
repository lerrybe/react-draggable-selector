import React, { useCallback, useEffect } from 'react';
import * as S from './styles';
import '../../styles/global.css';

import RowLabel from './RowLabel';
import TimeSlots from './TimeSlots';
import ColumnLabel from './ColumnLabel';

import { sampleDates } from '../../data/date';
import { Selection } from '../../types/event';
import { type TimeSlot } from '../../types/time';
import { DraggableSelectorProps } from '../../types/draggableSelector';
import { DEFAULT_MODE, DEFAULT_TIMEUNIT } from '../../constant/options';

import { useDataContext } from '../../context/DataContext';
import { useSlotStyleContext } from '../../context/SlotStyleContext';
import { useSelectorInfoContext } from '../../context/SelectorInfoContext';
import { useRowLabelStyleContext } from '../../context/RowLabelStyleContext';
import { useColumnLabelStyleContext } from '../../context/ColumnLabelStyleContext';
import { getTimeSlotMatrixByDay, getDatesForSelector } from '../../utils/date';
import {
  areTimeSlotsEqual,
  getTimeSlotMatrix,
  updateCachedSelectedTimeSlots,
  getSerializedTimeInfoFromSlot,
} from '../../utils/time';

const DraggableSelector = React.memo((props: DraggableSelectorProps) => {
  const { dates, startTime, endTime, mode, timeUnit, selectedTimeSlots, setSelectedTimeSlots } = props;

  const {
    selectedDates,
    setSelectedDates,
    dragEventStates,
    setDragEventStates,
    timeSlotMatrix,
    setTimeSlotMatrix,
    mockTimeSlotMatrix,
    setMockTimeSlotMatrix,
    timeSlotMatrixByDay,
    setTimeSlotMatrixByDay,
  } = useDataContext();

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
    setSelectedDates(getDatesForSelector(dates));
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
        const { date: slotDate } = getSerializedTimeInfoFromSlot(slot);
        const standardDate = new Date(slotDate);
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
      dates: getDatesForSelector(sampleDates),
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

  // SET CONTEXT
  const dataValue = useSelectorInfoContext();
  useEffect(() => {
    dataValue.setMode(props?.mode);
    dataValue.setLanguage(props?.language);
    dataValue.setDateFormat(props?.dateFormat);
    dataValue.setTimeFormat(props?.timeFormat);
  }, [props, dataValue]);
  const rowValue = useRowLabelStyleContext()!;
  useEffect(() => {
    rowValue.setGap(props?.slotRowGap);
    rowValue.setRowHeight(props?.slotHeight);
    rowValue.setRowLabelBgColor(props?.rowLabelBgColor);
    rowValue.setRowLabelPadding(props?.rowLabelPadding);
    rowValue.setRowLabelBorderRadius(props?.rowLabelBorderRadius);
    rowValue.setRowLabelsColor(props?.rowLabelsColor);
    rowValue.setRowLabelsMargin(props?.rowLabelsMargin);
    rowValue.setRowLabelsBgColor(props?.rowLabelsBgColor);
    rowValue.setRowLabelsFontSize(props?.rowLabelsFontSize);
    rowValue.setRowLabelsFontWeight(props?.rowLabelsFontWeight);
    rowValue.setRowLabelsFontFamily(props?.rowLabelsFontFamily);
    rowValue.setRowLabelsBorderRadius(props?.rowLabelsBorderRadius);
  }, [props, rowValue]);
  const colValue = useColumnLabelStyleContext()!;
  useEffect(() => {
    colValue.setGap(props?.slotColumnGap);
    colValue.setColumnWidth(props?.slotWidth);
    colValue.setColumnMinWidth(props?.slotMinWidth);
    colValue.setIsColumnWidthGrow(props?.isSlotWidthGrow);
    colValue.setColumnLabelHeight(props?.columnLabelHeight);
    colValue.setColumnLabelBgColor(props?.columnLabelBgColor);
    colValue.setColumnLabelPadding(props?.columnLabelPadding);
    colValue.setColumnLabelBorderRadius(props?.columnLabelBorderRadius);
    colValue.setColumnLabelsColor(props?.columnLabelsColor);
    colValue.setColumnLabelsMargin(props?.columnLabelsMargin);
    colValue.setColumnLabelsBgColor(props?.columnLabelsBgColor);
    colValue.setColumnLabelsFontSize(props?.columnLabelsFontSize);
    colValue.setColumnLabelsFontWeight(props?.columnLabelsFontWeight);
    colValue.setColumnLabelsFontFamily(props?.columnLabelsFontFamily);
    colValue.setColumnLabelsBorderRadius(props?.columnLabelsBorderRadius);
  }, [props, colValue]);
  const slotValue = useSlotStyleContext()!;
  useEffect(() => {
    slotValue.setSlotRowGap(props?.slotRowGap);
    slotValue.setSlotColumnGap(props?.slotColumnGap);
    slotValue.setSlotWidth(props?.slotWidth);
    slotValue.setSlotHeight(props?.slotHeight);
    slotValue.setSlotMinWidth(props?.slotMinWidth);
    slotValue.setIsCursorPointer(props?.isCursorPointer);
    slotValue.setIsSlotWidthGrow(props?.isSlotWidthGrow);
    slotValue.setSlotBorderStyle(props?.slotBorderStyle);
    slotValue.setDefaultSlotColor(props?.defaultSlotColor);
    slotValue.setDisabledSlotColor(props?.disabledSlotColor);
    slotValue.setHoveredSlotColor(props?.hoveredSlotColor);
    slotValue.setSelectedSlotColor(props?.selectedSlotColor);
    slotValue.setSlotBorderRadius(props?.slotBorderRadius);
    slotValue.setSlotContainerBorderStyle(props?.slotContainerBorderStyle);
  }, [props, slotValue]);
  /* ----- EFFECTS ----- */

  return (
    <>
      <S.Container
        $width={props?.width}
        $height={props?.height}
        $margin={props?.margin}
        $padding={props?.padding}
        $minWidth={props?.minWidth}
        $maxWidth={props?.maxWidth}
        $minHeight={props?.minHeight}
        $maxHeight={props?.maxHeight}
        $scrollWidth={props?.scrollWidth}
        $scrollColor={props?.scrollColor}
        $scrollBgColor={props?.scrollBgColor}
        $isSlotWidthGrow={props?.isSlotWidthGrow}
      >
        {selectedDates && startTime && endTime && (
          <>
            {!props?.isRowLabelInvisible && (
              <S.LeftContainer $rowLabelWidth={props?.rowLabelWidth}>
                {!props?.isColumnLabelInvisible && <S.EmptySlot $height={props?.columnLabelHeight} />}
                <RowLabel />
              </S.LeftContainer>
            )}

            <S.RightContainer>
              {!props?.isColumnLabelInvisible && <ColumnLabel />}
              <TimeSlots
                handleMouseUp={handleMouseUp}
                handleMouseDown={handleMouseDown}
                handleMouseEnter={handleMouseEnter}
              />
            </S.RightContainer>
          </>
        )}
      </S.Container>
    </>
  );
});

export default DraggableSelector;
