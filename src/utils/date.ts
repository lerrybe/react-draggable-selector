import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { Day, type TimeSlot } from '../types/time';

/* MODULE EXTEND */
dayjs.extend(isBetween);

export const getSortedDates = (dates: Date[]) => {
  return [...dates].sort((a, b) => a.getTime() - b.getTime());
};

export const isDateBetween = (
  target: TimeSlot,
  start: TimeSlot,
  end: TimeSlot,
) => {
  const endDate = dayjs(end.date);
  const startDate = dayjs(start.date);
  const targetDate = dayjs(target.date);
  return targetDate.isBetween(startDate, endDate, 'day', '[]');
};

export const changeDateStringFormat = (dateStr: string) => {
  return `${dateStr[0]}${dateStr[1]}${dateStr[2]}${dateStr[3]}/${dateStr[4]}${dateStr[5]}/${dateStr[6]}${dateStr[7]}`;
};

export const getDay = (dayNumber: 0 | 1 | 2 | 3 | 4 | 5 | 6) => {
  const DAY = {
    0: Day.SUN,
    1: Day.MON,
    2: Day.TUE,
    3: Day.WED,
    4: Day.THU,
    5: Day.FRI,
    6: Day.SAT,
  };

  return DAY[dayNumber];
};
