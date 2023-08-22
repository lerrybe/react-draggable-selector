import React from 'react';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { TimeSlot, TimeSlotRecord } from '../types/timeInfo';
import { DragEventStates, Selection } from '../types/domEvent';

/* MODULE EXTEND */
dayjs.extend(isBetween);

const getStrDateKey = (date: Date) => {
  return dayjs(date).format('YYYYMMDD');
};

export const getLabelsFromDates = (dates: Date[], form?: string) => {
  return dates.map(date => {
    return dayjs(date).format(`${form ?? 'MM.DD'}`);
  });
};

export const getFilteredTimeSlotsByDate = (dates: Date[], timeSlots: TimeSlot[]) => {
  return [...timeSlots]?.filter(slot => {
    const strDates = dates.map(date => {
      return getStrDateKey(date);
    });
    return strDates.includes(slot.date);
  });
};

export const areTimeSlotsEqual = (a: TimeSlot, b: TimeSlot) => {
  return a.date === b.date && a.minTime === b.minTime && a.maxTime === b.maxTime;
};

export const areTimeSlotsEqualByDayAndTime = (a: TimeSlot, b: TimeSlot) => {
  return a.day === b.day && a.minTime === b.minTime && a.maxTime === b.maxTime;
};

export const getTimeSlotMatrixByDay = (matrix: TimeSlot[][]) => {
  if (!matrix || matrix?.length === 0) return;

  const sortedMatrix: TimeSlot[][] = [[], [], [], [], [], [], []];
  matrix?.forEach((timeSlots: TimeSlot[]) => {
    timeSlots?.forEach((timeSlot: TimeSlot) => {
      sortedMatrix[timeSlot.day].push(timeSlot);
    });
  });
  return sortedMatrix;
};

function isDateBetween(start: TimeSlot, target: TimeSlot, end: TimeSlot): boolean {
  const endDate = dayjs(end.date);
  const startDate = dayjs(start.date);
  const targetDate = dayjs(target.date);
  return targetDate.isBetween(startDate, endDate, 'day', '[]');
}

function isTimeBetween(start: TimeSlot, target: TimeSlot, end: TimeSlot): boolean {
  const date = start.date;
  const endTime = dayjs(`${date} ${end.minTime}`);
  const startTime = dayjs(`${date} ${start.minTime}`);
  const targetTime = dayjs(`${date} ${target.minTime}`);
  return targetTime.isBetween(startTime, endTime, undefined, '[]');
}

export const getTimeSlotRecord = ({
  dates,
  maxTime,
  minTime,
  timeUnit,
}: {
  dates?: Date[];
  minTime?: string | null;
  maxTime?: string | null;
  timeUnit: 5 | 10 | 15 | 20 | 30 | 60;
}) => {
  if (!dates || !minTime || !maxTime) return;

  const startHour = Number(minTime.split(':')[0]);
  const startMinute = Number(minTime.split(':')[1]);
  const endHour = Number(maxTime.split(':')[0]);
  const endMinute = Number(maxTime.split(':')[1]);

  const record: TimeSlotRecord = {};
  dates.forEach(date => {
    const times: Record<string, TimeSlot> = {};
    const key = getStrDateKey(date);
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

      times[`${formattedHour}:${formattedMinute}`] = {
        date: key,
        day: date.getDay(),
        minTime: `${formattedHour}:${formattedMinute}`,
        maxTime: `${formattedEndHour}:${formattedEndMinute}`,
      };

      minute += timeUnit;
      if (minute >= 60) {
        hour += 1;
        minute -= 60;
      }
    }
    record[key] = times;
  });
  return record;
};

export const getTimeSlotMatrix = (timeSlotRecord: TimeSlotRecord) => {
  const matrix: TimeSlot[][] = [];
  for (const date in timeSlotRecord) {
    const timeSlots = [];
    for (const time in timeSlotRecord[date]) {
      timeSlots.push(timeSlotRecord[date][time]);
    }
    matrix.push(timeSlots);
  }
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
            const dateIsReversed = dayjs(endedTimeSlot.date).isBefore(dayjs(startedTimeSlot.date));
            const date = startedTimeSlot.date;
            const timeIsReversed = dayjs(`${date}
              ${endedTimeSlot.minTime}`).isBefore(
              dayjs(`${date}
              ${startedTimeSlot.minTime}`),
            );
            return acc.concat(
              dayOfTimes.filter(
                t =>
                  isDateBetween(
                    dateIsReversed ? endedTimeSlot : startedTimeSlot,
                    t,
                    dateIsReversed ? startedTimeSlot : endedTimeSlot,
                  ) &&
                  isTimeBetween(
                    timeIsReversed ? endedTimeSlot : startedTimeSlot,
                    t,
                    timeIsReversed ? startedTimeSlot : endedTimeSlot,
                  ),
              ),
            );
          }, [])
        : [startedTimeSlot]
      : [];

  const nextDraft =
    selectionType === Selection.ADD
      ? Array.from(new Set([...selectedTimeSlots, ...updatedCachedSelectedTimeSlots]))
      : selectionType === Selection.REMOVE
      ? selectedTimeSlots.filter(a => !updatedCachedSelectedTimeSlots.find(b => areTimeSlotsEqual(a, b)))
      : [...selectedTimeSlots];

  setDragEventStates(prev => ({
    ...prev,
    cachedSelectedTimeSlots: nextDraft,
  }));
};
