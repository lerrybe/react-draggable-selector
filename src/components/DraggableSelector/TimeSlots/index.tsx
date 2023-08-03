import * as S from './styles';
import { type TimeSlot } from '../../../types/time';
import { areTimeSlotsEqual } from '../../../utils/time';

interface TimeSlotsProps {
  timeSlotMatrix?: TimeSlot[][];
  cachedSelectedTimeSlots?: TimeSlot[];
  handleMouseUp: (timeSlot: TimeSlot) => void;
  handleMouseDown: (timeSlot: TimeSlot) => void;
  handleMouseEnter: (timeSlot: TimeSlot) => void;

  slotWidth?: number;
  slotHeight?: number;
  defaultSlotColor?: string;
  selectedSlotColor?: string;
  hoveredSlotColor?: string;
  slotRowGap?: number;
  slotColumnGap?: number;
  slotBorderStyle?: string; // '1px solid #000'
}

export default function TimeSlots({
  handleMouseUp,
  handleMouseDown,
  handleMouseEnter,
  timeSlotMatrix,
  cachedSelectedTimeSlots, // slotWidth,
  // slotHeight,
} // defaultSlotColor,
// selectedSlotColor,
// hoveredSlotColor,
// slotRowGap,
// slotColumnGap,
// slotBorderStyle,
: TimeSlotsProps) {
  if (!timeSlotMatrix) {
    return <></>;
  }

  const cols: number = timeSlotMatrix?.length;
  const rows: number = timeSlotMatrix[0]?.length;
  const gridTemplateRows: string = `repeat(${rows}, 30px)`;
  const gridTemplateColumns: string = `repeat(${cols}, 60px)`;

  return (
    <S.ItemsGrid rows={gridTemplateRows} cols={gridTemplateColumns}>
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
              <S.Item
                key={key}
                selected={selected}
                onMouseUp={() => {
                  handleMouseUp(targetSlot);
                }}
                onMouseDown={() => {
                  handleMouseDown(targetSlot);
                }}
                onMouseEnter={() => {
                  handleMouseEnter(targetSlot);
                }}
              ></S.Item>
            );
          }),
      )}
    </S.ItemsGrid>
  );
}
