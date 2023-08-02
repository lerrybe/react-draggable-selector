import * as S from './styles';
import { type TimeSlot } from '../../../types/time';
import { areTimeSlotsEqual } from '../../../utils/time';

interface TimeSlotsProps {
  timeSlotMatrix?: TimeSlot[][];
  cachedSelectedTimeSlots?: TimeSlot[];
  handleMouseUp: (timeSlot: TimeSlot) => void;
  handleMouseDown: (timeSlot: TimeSlot) => void;
  handleMouseEnter: (timeSlot: TimeSlot) => void;
}

const TimeSlots = ({
  handleMouseUp,
  handleMouseDown,
  handleMouseEnter,
  timeSlotMatrix,
  cachedSelectedTimeSlots,
}: TimeSlotsProps) => {
  if (!timeSlotMatrix) {
    return <></>;
  }

  const cols: number = timeSlotMatrix?.length;
  const rows: number = timeSlotMatrix[0]?.length;
  const gridTemplateRows: string = `repeat(${rows}, 30px)`;
  const gridTemplateColumns: string = `repeat(${cols}, 60px)`;

  return (
    <S.Wrapper
      style={{ display: 'grid', gridTemplateColumns, gridTemplateRows }}
    >
      {timeSlotMatrix[0]?.map(
        (_, colIndex: number) =>
          timeSlotMatrix?.map(timeSlots => {
            const targetSlot = timeSlots[colIndex];
            const { date, startTime, endTime } = targetSlot;
            const key = `${date}${startTime}${endTime}`;
            const selected = Boolean(
              cachedSelectedTimeSlots?.find(slot =>
                areTimeSlotsEqual(slot, targetSlot),
              ),
            );
            return (
              <S.Slot
                selected={selected}
                key={key}
                onMouseUp={() => {
                  handleMouseUp(targetSlot);
                }}
                onMouseDown={() => {
                  handleMouseDown(targetSlot);
                }}
                onMouseEnter={() => {
                  handleMouseEnter(targetSlot);
                }}
              />
            );
          }),
      )}
    </S.Wrapper>
  );
};

export default TimeSlots;
