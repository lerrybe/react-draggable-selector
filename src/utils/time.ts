import React from 'react';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { type TimeSlot } from '../types/time';
import { getDay, getDayNum, isDateBetween } from './date';
import { type DragEventStates, Selection } from '../types/event';

/* MODULE EXTEND */
dayjs.extend(isBetween);

export const getSerializedTimeInfoFromSlot = (slot: { start: Date; end: Date }) => {
  const { start, end } = slot;
  const startDayjsDate = dayjs(start);
  const endDayjsDate = dayjs(end);
  const date = startDayjsDate.format('YYYY/MM/DD');
  const startTime = startDayjsDate.format('HH:mm');
  const endTime = endDayjsDate.format('HH:mm');
  const day = getDay(start.getDay() as 0 | 1 | 2 | 3 | 4 | 5 | 6);

  return { date, startTime, endTime, day };
};

export const areTimeSlotsEqual = (slot1: TimeSlot, slot2: TimeSlot, mode: 'date' | 'day') => {
  const { day: day1, date: date1, startTime: startTime1, endTime: endTime1 } = getSerializedTimeInfoFromSlot(slot1);
  const { day: day2, date: date2, startTime: startTime2, endTime: endTime2 } = getSerializedTimeInfoFromSlot(slot2);
  if (mode === 'day') {
    return day1 === day2 && endTime1 === endTime2 && startTime1 === startTime2;
  } else {
    return date1 === date2 && endTime1 === endTime2 && startTime1 === startTime2;
  }
};

const isTimeBetween = (target: TimeSlot, start: TimeSlot, end: TimeSlot) => {
  const { date: standardDate } = getSerializedTimeInfoFromSlot(start);
  const endStartTime = dayjs(`${standardDate} ${getSerializedTimeInfoFromSlot(end).startTime}`);
  const startStartTime = dayjs(`${standardDate} ${getSerializedTimeInfoFromSlot(start).startTime}`);
  const targetStartTime = dayjs(`${standardDate} ${getSerializedTimeInfoFromSlot(target).startTime}`);
  return targetStartTime.isBetween(startStartTime, endStartTime, undefined, '[]');
};

export const getTimeSlotMatrix = ({
  dates,
  timeUnit,
  endTime,
  startTime,
}: {
  dates?: Date[];
  startTime?: string | null;
  endTime?: string | null;
  timeUnit: 5 | 10 | 15 | 20 | 30 | 60;
}) => {
  if (!dates || !startTime || !endTime) return;

  const startHour = Number(startTime?.split(':')[0]);
  const startMinute = Number(startTime?.split(':')[1]);
  const endHour = Number(endTime?.split(':')[0]);
  const endMinute = Number(endTime?.split(':')[1]);

  const matrix: TimeSlot[][] = [];
  dates?.forEach(date => {
    const times: TimeSlot[] = [];
    const key = dayjs(date)?.format('YYYY/MM/DD');

    let hour = startHour;
    let minute = startMinute;
    while (hour < endHour || (hour === endHour && minute < endMinute)) {
      const formattedHour = hour.toString().padStart(2, '0');
      const formattedMinute = minute.toString().padStart(2, '0');
      const currEndMinute = minute + timeUnit;

      let formattedEndHour = hour.toString().padStart(2, '0');
      let formattedEndMinute = currEndMinute.toString().padStart(2, '0');

      if (currEndMinute >= 60) {
        formattedEndHour = (hour + 1).toString().padStart(2, '0');
        formattedEndMinute = (currEndMinute - 60).toString().padStart(2, '0');
      }

      const start = new Date(`${key} ${formattedHour}:${formattedMinute}`);
      const end = new Date(`${key} ${formattedEndHour}:${formattedEndMinute}`);
      times.push({
        start,
        end,
      });

      minute += timeUnit;
      if (minute >= 60) {
        hour += 1;
        minute -= 60;
      }
    }
    matrix.push(times);
  });
  return matrix;
};

export const updateCachedSelectedTimeSlots = ({
  mode,
  endedTimeSlot,
  timeSlotMatrix,
  dragEventStates,
  selectedTimeSlots,
  setDragEventStates,
  timeSlotMatrixByDay,
}: {
  mode: 'date' | 'day';
  timeSlotMatrix: TimeSlot[][];
  timeSlotMatrixByDay: TimeSlot[][];
  selectedTimeSlots: TimeSlot[];
  endedTimeSlot: TimeSlot | null;
  dragEventStates: DragEventStates;
  setDragEventStates: React.Dispatch<React.SetStateAction<DragEventStates>>;
}) => {
  const { startedTimeSlot, selectionType } = dragEventStates;

  if (!startedTimeSlot || !selectionType) return;

  const updatedCachedSelectedTimeSlots: TimeSlot[] =
    startedTimeSlot && endedTimeSlot && selectionType
      ? endedTimeSlot
        ? timeSlotMatrix?.reduce((acc, dayOfTimes) => {
            const dateIsReversed = dayjs(getSerializedTimeInfoFromSlot(endedTimeSlot).date).isBefore(
              dayjs(getSerializedTimeInfoFromSlot(startedTimeSlot).date),
            );
            const standardDate = getSerializedTimeInfoFromSlot(startedTimeSlot).date;
            const timeIsReversed = dayjs(
              `${standardDate} ${getSerializedTimeInfoFromSlot(endedTimeSlot).startTime}`,
            ).isBefore(dayjs(`${standardDate} ${getSerializedTimeInfoFromSlot(startedTimeSlot).startTime}`));

            return acc?.concat(
              dayOfTimes?.filter(
                t =>
                  isDateBetween(
                    t,
                    dateIsReversed ? endedTimeSlot : startedTimeSlot,
                    dateIsReversed ? startedTimeSlot : endedTimeSlot,
                  ) &&
                  isTimeBetween(
                    t,
                    timeIsReversed ? endedTimeSlot : startedTimeSlot,
                    timeIsReversed ? startedTimeSlot : endedTimeSlot,
                  ),
              ),
            );
          }, [])
        : [startedTimeSlot]
      : [];

  if (mode === 'day') {
    const cachedSelectedAllTimeSlots: TimeSlot[] = [];
    updatedCachedSelectedTimeSlots?.forEach(slot => {
      const { day } = getSerializedTimeInfoFromSlot(slot);
      const target = timeSlotMatrixByDay[getDayNum(day)];
      target?.forEach(t => {
        if (areTimeSlotsEqual(slot, t, 'day')) {
          cachedSelectedAllTimeSlots.push(t);
        }
      });
    });
    const nextCache =
      selectionType === Selection.ADD
        ? Array.from(new Set([...selectedTimeSlots, ...cachedSelectedAllTimeSlots]))
        : selectionType === Selection.REMOVE
        ? selectedTimeSlots?.filter(a => {
            return !cachedSelectedAllTimeSlots.find(b => areTimeSlotsEqual(a, b, mode));
          })
        : [...selectedTimeSlots];

    setDragEventStates(prev => ({
      ...prev,
      cachedSelectedTimeSlots: nextCache,
    }));
  } else {
    const nextCache =
      selectionType === Selection.ADD
        ? Array.from(new Set([...selectedTimeSlots, ...updatedCachedSelectedTimeSlots]))
        : selectionType === Selection.REMOVE
        ? selectedTimeSlots?.filter(a => {
            return !updatedCachedSelectedTimeSlots.find(b => areTimeSlotsEqual(a, b, mode));
          })
        : [...selectedTimeSlots];

    setDragEventStates(prev => ({
      ...prev,
      cachedSelectedTimeSlots: nextCache,
    }));
  }
};
