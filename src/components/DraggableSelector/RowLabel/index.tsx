// import dayjs from 'dayjs';

import * as S from "./styles";
import { type TimeSlot } from "../../../types/time";
import moment from 'moment';

interface RowLabelProps {
  timeSlots?: TimeSlot[];
}

const RowLabel = ({ timeSlots }: RowLabelProps) => {
  if (!timeSlots || timeSlots.length === 0) {
    return <></>;
  }

  return (
    <S.Wrapper>
      {timeSlots.map(({ startTime }) => {
        return <S.Label key={startTime}>{moment(startTime, "HH:mm").format('hh:mm A')}</S.Label>;
      })}
    </S.Wrapper>
  );
};

export default RowLabel;
