import * as S from './styles';
import { type TimeSlot } from '../../../types/time';
import { areTimeSlotsEqual } from '../../../utils/time';

interface TimeSlotsProps {
  timeSlotMatrix?: TimeSlot[][];
  cachedSelectedTimeSlots?: TimeSlot[];
  handleMouseUp: (timeSlot: TimeSlot) => void;
  handleMouseDown: (timeSlot: TimeSlot) => void;
  handleMouseEnter: (timeSlot: TimeSlot) => void;

  slotRowGap?: string;
  slotColumnGap?: string;
  slotMinWidth?: string;
  slotHeight?: string;

  defaultSlotColor?: string;
  selectedSlotColor?: string;
  hoveredSlotColor?: string;
  slotBorderStyle?: string;
  slotBorderRadius?: string;
}

export default function TimeSlots({
  handleMouseUp,
  handleMouseDown,
  handleMouseEnter,
  timeSlotMatrix,
  cachedSelectedTimeSlots,

  slotRowGap,
  slotColumnGap,
  slotMinWidth,
  slotHeight,
  defaultSlotColor,
  selectedSlotColor,
  hoveredSlotColor,
  slotBorderStyle,
  slotBorderRadius,
}: TimeSlotsProps) {
  if (!timeSlotMatrix) {
    return <></>;
  }

  const cols: number = timeSlotMatrix?.length;
  const rows: number = timeSlotMatrix[0]?.length;
  const gridTemplateRows: string = `repeat(${rows}, 1fr)`;
  const gridTemplateColumns: string = `repeat(${cols}, 1fr)`;

  return (
    <S.ItemsGrid
      $rows={gridTemplateRows}
      $cols={gridTemplateColumns}
      $rowGap={slotRowGap}
      $columnGap={slotColumnGap}
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
              <S.Item
                key={key}
                selected={selected}
                $width={slotMinWidth}
                $height={slotHeight}
                $hoveredSlotColor={hoveredSlotColor}
                $defaultSlotColor={defaultSlotColor}
                $selectedSlotColor={selectedSlotColor}
                $slotBorderStyle={slotBorderStyle}
                $slotBorderRadius={slotBorderRadius}
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
