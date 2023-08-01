import * as S from "./styles";
import moment from 'moment';
import { type TimeSlot } from "../../../types/time";

interface TimeLabelProps {
  timeSlots?: TimeSlot[];
}

const TimeLabel = ({ timeSlots }: TimeLabelProps) => {
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

export default TimeLabel;
