export enum Day {
  SUN = 'SUN',
  MON = 'MON',
  TUE = 'TUE',
  WED = 'WED',
  THU = 'THU',
  FRI = 'FRI',
  SAT = 'SAT',
}

export interface TimeSlot {
  date: string;
  startTime: string;
  endTime: string;
  day: Day;
}
