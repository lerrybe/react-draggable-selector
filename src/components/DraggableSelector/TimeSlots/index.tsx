import { useMemo } from 'react';

import * as S from './styles';
import { getDayNum } from '../../../utils/date';
import { type TimeSlot } from '../../../types/time';
import { areTimeSlotsEqual } from '../../../utils/time';

interface TimeSlotsProps {
  mode: 'date' | 'day';
  timeSlotMatrix?: TimeSlot[][];
  mockTimeSlotMatrix?: TimeSlot[][];
  timeSlotMatrixByDay?: TimeSlot[][];
  cachedSelectedTimeSlots?: TimeSlot[];
  handleMouseUp: (timeSlot: TimeSlot) => void;
  handleMouseDown: (timeSlot: TimeSlot) => void;
  handleMouseEnter: (timeSlot: TimeSlot) => void;
  slotHeight?: string;
  slotMinWidth?: string;
  slotRowGap?: string;
  slotColumnGap?: string;
  slotBorderStyle?: string;
  slotBorderRadius?: string;
  defaultSlotColor?: string;
  hoveredSlotColor?: string;
  selectedSlotColor?: string;
  disabledSlotColor?: string;
}

export default function TimeSlots({
  mode,
  timeSlotMatrix,
  mockTimeSlotMatrix,
  timeSlotMatrixByDay,
  cachedSelectedTimeSlots,
  handleMouseUp,
  handleMouseDown,
  handleMouseEnter,
  slotHeight,
  slotMinWidth,
  slotRowGap,
  slotColumnGap,
  slotBorderStyle,
  slotBorderRadius,
  hoveredSlotColor,
  defaultSlotColor,
  selectedSlotColor,
  disabledSlotColor,
}: TimeSlotsProps) {
  const matrix = useMemo(() => {
    return mode === 'day' ? mockTimeSlotMatrix : timeSlotMatrix;
  }, [mockTimeSlotMatrix, mode, timeSlotMatrix]);

  if (!matrix || !timeSlotMatrixByDay) {
    return <></>;
  }

  const cols: number = matrix?.length;
  const rows: number = matrix[0]?.length;
  const gridTemplateRows: string = `repeat(${rows}, 1fr)`;
  const gridTemplateColumns: string = `repeat(${cols}, 1fr)`;

  return (
    <S.ItemsGrid
      $rowGap={slotRowGap}
      $rows={gridTemplateRows}
      $columnGap={slotColumnGap}
      $cols={gridTemplateColumns}
    >
      {matrix[0]?.map(
        (_, colIndex: number) =>
          matrix?.map(timeSlots => {
            const targetSlot = timeSlots[colIndex];
            const { date, startTime, endTime } = targetSlot;
            const key = `${date}${startTime}${endTime}`;
            const selected = Boolean(
              cachedSelectedTimeSlots?.find(slot =>
                areTimeSlotsEqual(slot, targetSlot, mode),
              ),
            );

            return (
              <S.Item
                key={key}
                selected={selected}
                $selectDisabled={
                  mode === 'day'
                    ? timeSlotMatrixByDay[getDayNum(targetSlot.day)]?.length ===
                      0
                    : false
                }
                $height={slotHeight}
                $width={slotMinWidth}
                $slotBorderStyle={slotBorderStyle}
                $slotBorderRadius={slotBorderRadius}
                $hoveredSlotColor={hoveredSlotColor}
                $defaultSlotColor={defaultSlotColor}
                $selectedSlotColor={selectedSlotColor}
                $disabledSlotColor={disabledSlotColor}
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
