import dayjs from 'dayjs';
import * as S from './styles';
import { type TimeSlot } from '../../../types/time';

interface RowLabelProps {
  timeSlots?: TimeSlot[];
}

export default function RowLabel({ timeSlots }: RowLabelProps) {
  if (!timeSlots || timeSlots.length === 0) {
    return <></>;
  }

  return (
    <S.Items>
      {timeSlots.map(({ date, startTime, endTime }) => {
        const dayjsDate = dayjs(`${date} ${startTime}:${endTime}`);
        return <S.Item key={startTime}>{dayjsDate.format('hh:mm A')}</S.Item>;
      })}
    </S.Items>
  );
}
