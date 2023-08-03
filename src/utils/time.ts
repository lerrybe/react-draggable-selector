import React from 'react';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

import { getDay, isDateBetween } from './date.ts';
import { type TimeSlot } from '../types/time';
import { type DragEventStates, Selection } from '../types/event';

/* MODULE EXTEND */
dayjs.extend(isBetween);

export const areTimeSlotsEqual = (a: TimeSlot, b: TimeSlot) => {
  return (
    a.date === b.date && a.startTime === b.startTime && a.endTime === b.endTime
  );
};

const isTimeBetween = (target: TimeSlot, start: TimeSlot, end: TimeSlot) => {
  const standardDate = start.date;
  const endStartTime = dayjs(`${standardDate} ${end.startTime}`);
  const startStartTime = dayjs(`${standardDate} ${start.startTime}`);
  const targetStartTime = dayjs(`${standardDate} ${target.startTime}`);
  return targetStartTime.isBetween(
    startStartTime,
    endStartTime,
    undefined,
    '[]',
  );
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

  const startHour = Number(startTime.split(':')[0]);
  const startMinute = Number(startTime.split(':')[1]);
  const endHour = Number(endTime.split(':')[0]);
  const endMinute = Number(endTime.split(':')[1]);

  const matrix: TimeSlot[][] = [];
  dates.forEach(date => {
    const times: TimeSlot[] = [];
    const key = dayjs(date).format('YYYYMMDD');

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

      times.push({
        date: key,
        startTime: `${formattedHour}:${formattedMinute}`,
        endTime: `${formattedEndHour}:${formattedEndMinute}`,
        day: getDay(date.getDay() as 0 | 1 | 2 | 3 | 4 | 5 | 6),
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
  endedTimeSlot,
  timeSlotMatrix,
  dragEventStates,
  selectedTimeSlots,
  setDragEventStates,
}: {
  timeSlotMatrix: TimeSlot[][];
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
        ? timeSlotMatrix.reduce((acc, dayOfTimes) => {
            const dateIsReversed = dayjs(endedTimeSlot.date).isBefore(
              dayjs(startedTimeSlot.date),
            );
            const standardDate = startedTimeSlot.date;
            const timeIsReversed = dayjs(
              `${standardDate} ${endedTimeSlot.startTime}`,
            ).isBefore(dayjs(`${standardDate} ${startedTimeSlot.startTime}`));

            return acc.concat(
              dayOfTimes.filter(
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

  const nextDraft =
    selectionType === Selection.ADD
      ? Array.from(
          new Set([...selectedTimeSlots, ...updatedCachedSelectedTimeSlots]),
        )
      : selectionType === Selection.REMOVE
      ? selectedTimeSlots.filter(
          a =>
            !updatedCachedSelectedTimeSlots.find(b => areTimeSlotsEqual(a, b)),
        )
      : [...selectedTimeSlots];

  setDragEventStates(prev => ({
    ...prev,
    cachedSelectedTimeSlots: nextDraft,
  }));
};
