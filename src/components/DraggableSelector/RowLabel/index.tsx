import dayjs from 'dayjs';
import * as S from './styles';
import { type TimeSlot } from '../../../types/time';

interface RowLabelProps {
  timeSlots?: TimeSlot[];

  gap?: number;
  slotHeight?: number;
}

export default function RowLabel({
  timeSlots,
  gap,
  slotHeight,
}: RowLabelProps) {
  if (!timeSlots || timeSlots.length === 0) {
    return <></>;
  }

  return (
    <S.Items gap={gap}>
      {timeSlots.map(({ date, startTime, endTime }) => {
        const dayjsDate = dayjs(`${date} ${startTime}:${endTime}`);
        return (
          <S.Item key={startTime} height={slotHeight}>
            {dayjsDate.format('hh:mm A')}
          </S.Item>
        );
      })}
    </S.Items>
  );
}
