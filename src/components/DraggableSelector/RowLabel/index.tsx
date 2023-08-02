import dayjs from 'dayjs';
import S from './RowLabel.module.css';
import { type TimeSlot } from '../../../types/time';

interface RowLabelProps {
  timeSlots?: TimeSlot[];
}

export default function RowLabel({ timeSlots }: RowLabelProps) {
  if (!timeSlots || timeSlots.length === 0) {
    return <></>;
  }

  return (
    <ul className={S.wrapper}>
      {timeSlots.map(({ date, startTime, endTime }) => {
        const dayjsDate = dayjs(`${date} ${startTime}:${endTime}`);
        return (
          <li key={startTime} className={S.label}>
            {dayjsDate.format('hh:mm A')}
          </li>
        );
      })}
    </ul>
  );
}
