import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { type TimeSlot } from '../types/time';

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
