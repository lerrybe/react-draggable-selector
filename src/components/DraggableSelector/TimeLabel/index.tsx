import * as S from "./styles";
import { type TimeSlot } from "../../../types/time";

interface TimeLabelProps {
  timeSlots?: TimeSlot[];
}

const TimeLabel = ({ timeSlots }: TimeLabelProps) => {
  if (!timeSlots || timeSlots.length === 0) {
    return <></>;
  }

  return (
    <ul>
      {timeSlots.map(({ startTime }) => {
        return <S.Label key={startTime}>{startTime}</S.Label>;
      })}
    </ul>
  );
};

export default TimeLabel;
