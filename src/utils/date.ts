import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { Day, type TimeSlot } from '../types/time';

/* MODULE EXTEND */
dayjs.extend(isBetween);

export const getUniqueDateKey = (date: Date) => {
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
};

export const removeDuplicatesAndSortByDate = (dates: Date[]) => {
  const uniqueDates = new Set<string>();
  for (const date of dates) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    uniqueDates.add(`${year}/${month}/${day}`);
  }
  const sortedDates = Array.from(uniqueDates)?.sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime(),
  );
  return sortedDates?.map(strDate => new Date(strDate));
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

export const getDayNum = (day: Day) => {
  const DAY_NUM = {
    SUN: 0,
    MON: 1,
    TUE: 2,
    WED: 3,
    THU: 4,
    FRI: 5,
    SAT: 6,
  };

  return DAY_NUM[day];
};

export const getIterableDays = (version: 'en' | 'ko') => {
  const DAYS = {
    en: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
    ko: ['일', '월', '화', '수', '목', '금', '토'],
  };

  return DAYS[version];
};

export const getTimeSlotMatrixByDay = (matrix: TimeSlot[][]) => {
  if (!matrix || matrix?.length === 0) return;

  const sortedMatrix: TimeSlot[][] = [[], [], [], [], [], [], []];
  matrix?.forEach((timeSlots: TimeSlot[]) => {
    timeSlots?.forEach((timeSlot: TimeSlot) => {
      sortedMatrix[getDayNum(timeSlot.day)].push(timeSlot);
    });
  });
  return sortedMatrix;
};
