import React, { useEffect, useLayoutEffect, useState } from 'react';

import * as S from './styles';

import {
  areTimeSlotsEqual,
  getLabelsFromDates,
  getFilteredTimeSlotsByDate,
  updateCachedSelectedTimeSlots,
} from '../../../utils/time';

import TimeLabel from '../TimeLabel';
import DateLabel from '../DateLabel';
import TimeSlots from '../TimeSlots';

import { TimeSlot } from '../../../types/timeInfo';
import { DragEventStates, Selection } from '../../../types/domEvent';

interface SelectorProps {
  slotWidth: number;
  slotHeight: number;
  slotsMarginTop: number;
  slotsMarginLeft: number;
  maxWidth: string;
  maxHeight: string;
  defaultSlotColor: string;
  selectedSlotColor: string;
  disabledSlotColor: string;
  hoveredSlotColor: string;
  slotsContainerBorder: string;
  slotsContainerBorderRadius: string;
  minTime: string;
  maxTime: string;
  dateFormat: string;
  timeFormat: string;
  mode: 'day' | 'date';
  selectedDates: Date[];
  timeSlotMatrix: TimeSlot[][];
  cachedMatrixByDay: TimeSlot[][];
  selectedTimeSlots: TimeSlot[];
  timeUnit: 5 | 10 | 15 | 20 | 30 | 60;
  setSelectedTimeSlots: React.Dispatch<React.SetStateAction<TimeSlot[]>>;
}

export default function Selector({
  mode,
  slotWidth,
  slotHeight,
  slotsMarginTop,
  slotsMarginLeft,
  maxWidth,
  maxHeight,
  defaultSlotColor,
  selectedSlotColor,
  disabledSlotColor,
  hoveredSlotColor,
  slotsContainerBorder,
  slotsContainerBorderRadius,
  minTime,
  maxTime,
  timeUnit,
  dateFormat,
  timeFormat,
  selectedDates,
  timeSlotMatrix,
  cachedMatrixByDay,
  selectedTimeSlots,
  setSelectedTimeSlots,
}: SelectorProps) {
  /* STATES */
  const [dragEventStates, setDragEventStates] = useState<DragEventStates>({
    selectionType: null,
    startedTimeSlot: null,
    cachedSelectedTimeSlots: [],
  });

  /* ACTIONS */
  const actions = {
    startSelection: (startedTimeSlot: TimeSlot, selectedTimeSlots: TimeSlot[]) => {
      const selectedTimeSlot = selectedTimeSlots.find(slot => areTimeSlotsEqual(startedTimeSlot, slot));
      setDragEventStates(prev => ({
        ...prev,
        startedTimeSlot: startedTimeSlot,
        selectionType: selectedTimeSlot ? Selection.REMOVE : Selection.ADD,
      }));
    },
    updateData: () => {
      setSelectedTimeSlots(dragEventStates.cachedSelectedTimeSlots);
      setDragEventStates(prev => ({
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

  /* HANDLERS */
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
    document.addEventListener('mouseup', actions.updateData);
    return () => {
      document.removeEventListener('mouseup', actions.updateData);
    };
  }, [actions.updateData]);

  /* 🧹 Cleanup cache when mode, minTime, maxTime, timeUnit is changed */
  useEffect(() => {
    setDragEventStates({
      selectionType: null,
      startedTimeSlot: null,
      cachedSelectedTimeSlots: [],
    });
  }, [mode, minTime, maxTime, timeUnit]);

  /* Remove timeSlots if date is not in the selectedDates */
  useLayoutEffect(() => {
    const filteredTimeSlots = getFilteredTimeSlotsByDate(selectedDates, selectedTimeSlots);
    setSelectedTimeSlots(filteredTimeSlots);
    setDragEventStates(prev => ({
      ...prev,
      cachedSelectedTimeSlots: filteredTimeSlots,
    }));
  }, [selectedDates, cachedMatrixByDay]);

  return (
    <S.Container $maxWidth={maxWidth} $maxHeight={maxHeight}>
      {selectedDates && minTime && maxTime && (
        <>
          <S.ContainerL $marginRight={slotsMarginLeft}>
            <S.EmptySlot $marginBottom={slotsMarginTop} />
            <TimeLabel slotHeight={slotHeight} timeFormat={timeFormat} timeSlots={timeSlotMatrix[0]} />
          </S.ContainerL>
          <S.ContainerR>
            <DateLabel
              slotWidth={slotWidth}
              marginBottom={slotsMarginTop}
              labels={
                mode === 'day'
                  ? ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
                  : getLabelsFromDates(selectedDates, dateFormat)
              }
            />
            <TimeSlots
              mode={mode}
              slotWidth={slotWidth}
              slotHeight={slotHeight}
              defaultSlotColor={defaultSlotColor}
              selectedSlotColor={selectedSlotColor}
              disabledSlotColor={disabledSlotColor}
              hoveredSlotColor={hoveredSlotColor}
              slotsContainerBorder={slotsContainerBorder}
              slotsContainerBorderRadius={slotsContainerBorderRadius}
              timeSlotMatrix={timeSlotMatrix}
              cachedMatrixByDay={cachedMatrixByDay}
              handleMouseUp={handlers.handleMouseUp}
              handleMouseDown={handlers.handleMouseDown}
              handleMouseEnter={handlers.handleMouseEnter}
              cachedSelectedTimeSlots={dragEventStates.cachedSelectedTimeSlots}
            />
          </S.ContainerR>
        </>
      )}
    </S.Container>
  );
}
