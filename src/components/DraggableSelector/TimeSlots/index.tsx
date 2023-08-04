import { useEffect, useState } from 'react';

import * as S from './styles';
import { type TimeSlot } from '../../../types/time';
import { areTimeSlotsEqual } from '../../../utils/time';
import { getDayNum } from '../../../utils/date.ts';

interface TimeSlotsProps {
  timeSlotMatrix?: TimeSlot[][];
  mockTimeSlotMatrix?: TimeSlot[][];
  cachedSelectedTimeSlots?: TimeSlot[];
  sortedTimeSlotMatrixByDay?: TimeSlot[][];

  handleMouseUp: (timeSlot: TimeSlot) => void;
  handleMouseDown: (timeSlot: TimeSlot) => void;
  handleMouseEnter: (timeSlot: TimeSlot) => void;
  mode: 'date' | 'day';

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
  mockTimeSlotMatrix,
  sortedTimeSlotMatrixByDay,
  mode,

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
  const [matrix, setMatrix] = useState<TimeSlot[][]>();

  useEffect(() => {
    if (mode === 'day') {
      setMatrix(mockTimeSlotMatrix);
    } else {
      setMatrix(timeSlotMatrix);
    }
  }, [mockTimeSlotMatrix, mode, timeSlotMatrix]);

  if (!matrix || !sortedTimeSlotMatrixByDay) {
    return <></>;
  }

  const cols: number = matrix?.length;
  const rows: number = matrix[0]?.length;
  const gridTemplateRows: string = `repeat(${rows}, 1fr)`;
  const gridTemplateColumns: string = `repeat(${cols}, 1fr)`;

  return (
    <S.ItemsGrid
      $rows={gridTemplateRows}
      $cols={gridTemplateColumns}
      $rowGap={slotRowGap}
      $columnGap={slotColumnGap}
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
                  mode === 'date'
                    ? false
                    : sortedTimeSlotMatrixByDay[getDayNum(targetSlot.day)]
                        .length === 0
                }
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
