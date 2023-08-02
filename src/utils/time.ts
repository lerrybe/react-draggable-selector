import moment from 'moment';
import { type TimeSlot } from '../types/time';
import { type DragEventStates, Selection } from '../types/event';

export const getSortedDates = (dates: Date[]) => {
  return [...dates].sort((a, b) => a.getTime() - b.getTime());
};

export const areTimeSlotsEqual = (a: TimeSlot, b: TimeSlot) => {
  return (
    a.date === b.date && a.startTime === b.startTime && a.endTime === b.endTime
  );
};

function isDateBetween(
  target: TimeSlot,
  start: TimeSlot,
  end: TimeSlot,
): boolean {
  const endDate = moment(end.date);
  const startDate = moment(start.date);
  const targetDate = moment(target.date);
  return targetDate.isBetween(startDate, endDate, 'day', '[]');
}

function isTimeBetween(
  target: TimeSlot,
  start: TimeSlot,
  end: TimeSlot,
): boolean {
  const endStartTime = moment(end.startTime, 'HH:mm');
  const startStartTime = moment(start.startTime, 'HH:mm');
  const targetStartTime = moment(target.startTime, 'HH:mm');
  return (
    targetStartTime.isSameOrAfter(startStartTime) &&
    targetStartTime.isSameOrBefore(endStartTime)
  );
}

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
    // const key = moment(date).format("YYYY/MM/DD");
    const key = moment(date).format('YYYYMMDD');
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
      // console.log(key, formattedEndHour, formattedEndMinute);
      // console.log(new Date(`${key}/${formattedHour}:${formattedMinute}`));

      times.push({
        date: key,
        startTime: `${formattedHour}:${formattedMinute}`,
        endTime: `${formattedEndHour}:${formattedEndMinute}`,
        day: date.getDay(),
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
            const dateIsReversed = moment(endedTimeSlot.date).isBefore(
              moment(startedTimeSlot.date),
            );
            const timeIsReversed = moment(
              endedTimeSlot.startTime,
              'HH:mm',
            ).isBefore(moment(startedTimeSlot.startTime, 'HH:mm'));
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
