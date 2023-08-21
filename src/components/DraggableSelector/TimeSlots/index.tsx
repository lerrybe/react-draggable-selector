import { useMemo } from 'react';

import * as S from './styles';
import { getDayNum } from '../../../utils/date';
import { type TimeSlot } from '../../../types/time';
import { areTimeSlotsEqual } from '../../../utils/time';
import { useSlotStyleContext } from '../../../context/SlotStyleContext';
import { DEFAULT_IS_SLOT_WIDTH_GROW, DEFAULT_MODE, DEFAULT_SLOT_WIDTH } from '../../../constant/options';

interface TimeSlotsProps {
  mode?: 'date' | 'day';
  timeSlotMatrix?: TimeSlot[][];
  mockTimeSlotMatrix?: TimeSlot[][];
  timeSlotMatrixByDay?: TimeSlot[][];
  cachedSelectedTimeSlots?: TimeSlot[];
  handleMouseUp: (timeSlot: TimeSlot) => void;
  handleMouseDown: (timeSlot: TimeSlot) => void;
  handleMouseEnter: (timeSlot: TimeSlot) => void;
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
}: TimeSlotsProps) {
  const value = useSlotStyleContext();

  const matrix = useMemo(() => {
    return (mode || DEFAULT_MODE) === 'day' ? mockTimeSlotMatrix : timeSlotMatrix;
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
      $rows={gridTemplateRows}
      $cols={gridTemplateColumns}
      $rowGap={value?.slotRowGap}
      $columnGap={value?.slotColumnGap}
      $isSlotWidthGrow={value?.isSlotWidthGrow || DEFAULT_IS_SLOT_WIDTH_GROW}
      onDragStart={() => false}
    >
      {matrix[0]?.map(
        (_, colIndex: number) =>
          matrix?.map(timeSlots => {
            const targetSlot = timeSlots[colIndex];
            const { date, startTime, endTime } = targetSlot;
            const key = `${date}${startTime}${endTime}`;
            const selected = Boolean(
              cachedSelectedTimeSlots?.find(slot => areTimeSlotsEqual(slot, targetSlot, mode || DEFAULT_MODE)),
            );

            return (
              <S.Item
                key={key}
                selected={selected}
                $selectDisabled={
                  (mode || DEFAULT_MODE) === 'day'
                    ? timeSlotMatrixByDay[getDayNum(targetSlot.day)]?.length === 0
                    : false
                }
                $width={value?.slotWidth || DEFAULT_SLOT_WIDTH}
                $height={value?.slotHeight}
                $minWidth={value?.slotMinWidth}
                $slotBorderStyle={value?.slotBorderStyle}
                $slotBorderRadius={value?.slotBorderRadius}
                $hoveredSlotColor={value?.hoveredSlotColor}
                $defaultSlotColor={value?.defaultSlotColor}
                $selectedSlotColor={value?.selectedSlotColor}
                $disabledSlotColor={value?.disabledSlotColor}
                $isSlotWidthGrow={value?.isSlotWidthGrow || DEFAULT_IS_SLOT_WIDTH_GROW}
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
