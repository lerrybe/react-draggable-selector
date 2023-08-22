import { useMemo } from 'react';
import dayjs from 'dayjs';
import * as S from './styles';
import { TimeSlot } from '../../../types/timeInfo';

interface TimeLabelProps {
  rowGap: number;
  slotHeight: number;
  timeFormat: string;
  timeSlots?: TimeSlot[];
}

const TimeLabel = ({ rowGap, slotHeight, timeFormat, timeSlots }: TimeLabelProps) => {
  const getEvenIdxTimeSlots = useMemo(() => {
    return timeSlots?.filter((_, idx) => idx % 2 === 0);
  }, [timeSlots]);

  if (!timeSlots || timeSlots.length === 0) {
    return <></>;
  }

  return (
    <S.Container $rowGap={rowGap}>
      {getEvenIdxTimeSlots?.map(({ date, minTime }) => {
        const dayjsDate = dayjs(`${date} ${minTime}`);
        return (
          <S.Label key={minTime} $height={slotHeight * 2}>
            {dayjsDate.format(timeFormat)}
          </S.Label>
        );
      })}
    </S.Container>
  );
};

export default TimeLabel;
