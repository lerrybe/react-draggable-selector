import moment from "moment";
import { type DragEventStates, Selection } from "../types/event";
import { type TimeSlot, type TimeSlotRecord } from "../types/time";

export const areTimeSlotsEqual = (a: TimeSlot, b: TimeSlot) => {
  return (
    a.date === b.date && a.startTime === b.startTime && a.endTime === b.endTime
  );
};

function isDateBetween(
  start: TimeSlot,
  target: TimeSlot,
  end: TimeSlot
): boolean {
  const endDate = moment(end.date);
  const startDate = moment(start.date);
  const targetDate = moment(target.date);
  return targetDate.isBetween(startDate, endDate, "day", "[]");
}

function isTimeBetween(
  start: TimeSlot,
  target: TimeSlot,
  end: TimeSlot
): boolean {
  const endStartTime = moment(end.startTime, "HH:mm");
  const startStartTime = moment(start.startTime, "HH:mm");
  const targetStartTime = moment(target.startTime, "HH:mm");
  return (
    targetStartTime.isSameOrAfter(startStartTime) &&
    targetStartTime.isSameOrBefore(endStartTime)
  );
}

export const getTimeSlotRecord = ({
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

  const startHour = Number(startTime.split(":")[0]);
  const startMinute = Number(startTime.split(":")[1]);
  const endHour = Number(endTime.split(":")[0]);
  const endMinute = Number(endTime.split(":")[1]);

  const record: TimeSlotRecord = {};
  dates.forEach((date) => {
    const times: Record<string, TimeSlot> = {};
    const key = moment(date).format("YYYYMMDD");
    let hour = startHour;
    let minute = startMinute;
    while (hour < endHour || (hour === endHour && minute < endMinute)) {
      const formattedHour = hour.toString().padStart(2, "0");
      const formattedMinute = minute.toString().padStart(2, "0");
      const currEndMinute = minute + timeUnit;

      let formattedEndHour = hour.toString().padStart(2, "0");
      let formattedEndMinute = currEndMinute.toString().padStart(2, "0");

      if (currEndMinute >= 60) {
        formattedEndHour = (hour + 1).toString().padStart(2, "0");
        formattedEndMinute = (currEndMinute - 60).toString().padStart(2, "0");
      }

      times[`${formattedHour}:${formattedMinute}`] = {
        date: key,
        startTime: `${formattedHour}:${formattedMinute}`,
        endTime: `${formattedEndHour}:${formattedEndMinute}`,
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
  const { startedTimeSlot, selectionType } =
    dragEventStates;

  if (!startedTimeSlot || !selectionType) return;

  const updatedCachedSelectedTimeSlots: TimeSlot[] =
    startedTimeSlot && endedTimeSlot && selectionType
      ? endedTimeSlot
        ? timeSlotMatrix.reduce((acc, dayOfTimes) => {
          const dateIsReversed = moment(endedTimeSlot.date).isBefore(
            moment(startedTimeSlot.date)
          );
          const timeIsReversed = moment(
            endedTimeSlot.startTime,
            "HH:mm"
          ).isBefore(moment(startedTimeSlot.startTime, "HH:mm"));
          return acc.concat(
            dayOfTimes.filter(
              (t) =>
                isDateBetween(
                  dateIsReversed ? endedTimeSlot : startedTimeSlot,
                  t,
                  dateIsReversed ? startedTimeSlot : endedTimeSlot
                ) &&
                isTimeBetween(
                  timeIsReversed ? endedTimeSlot : startedTimeSlot,
                  t,
                  timeIsReversed ? startedTimeSlot : endedTimeSlot
                )
            )
          );
        }, [])
        : [startedTimeSlot]
      : [];

  const nextDraft =
    selectionType === Selection.ADD
      ? Array.from(
        new Set([...selectedTimeSlots, ...updatedCachedSelectedTimeSlots])
      )
      : selectionType === Selection.REMOVE
        ? selectedTimeSlots.filter(
          (a) =>
            !updatedCachedSelectedTimeSlots.find((b) => areTimeSlotsEqual(a, b))
        )
        : [...selectedTimeSlots];

  setDragEventStates((prev) => ({
    ...prev,
    cachedSelectedTimeSlots: nextDraft,
  }));
};
