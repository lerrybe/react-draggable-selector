import { useMemo } from 'react';

import * as S from './styles';
import { getDayNum } from '../../../utils/date';
import { type TimeSlot } from '../../../types/time';
import { useDataContext } from '../../../context/DataContext';
import { useSlotStyleContext } from '../../../context/SlotStyleContext';
import { useSelectorInfoContext } from '../../../context/SelectorInfoContext';
import { areTimeSlotsEqual, getSerializedTimeInfoFromSlot } from '../../../utils/time';
import { DEFAULT_IS_SLOT_WIDTH_GROW, DEFAULT_MODE, DEFAULT_SLOT_WIDTH } from '../../../constant/options';

interface TimeSlotsProps {
  handleMouseUp: (timeSlot: TimeSlot) => void;
  handleMouseDown: (timeSlot: TimeSlot) => void;
  handleMouseEnter: (timeSlot: TimeSlot) => void;
}

/*
  "TimeSlots" component is used to display the every "slots" of the table.
*/
export default function TimeSlots({ handleMouseUp, handleMouseDown, handleMouseEnter }: TimeSlotsProps) {
  const slotValue = useSlotStyleContext();
  const { mode } = useSelectorInfoContext();
  const {
    timeSlotMatrix,
    mockTimeSlotMatrix,
    timeSlotMatrixByDay,
    dragEventStates: { cachedSelectedTimeSlots },
  } = useDataContext();

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
      $rowGap={slotValue?.slotRowGap}
      $columnGap={slotValue?.slotColumnGap}
      $isSlotWidthGrow={slotValue?.isSlotWidthGrow || DEFAULT_IS_SLOT_WIDTH_GROW}
      onDragStart={() => false}
    >
      {matrix[0]?.map(
        (_, colIndex: number) =>
          matrix?.map(timeSlots => {
            const targetSlot = timeSlots[colIndex];
            const { date, startTime, endTime } = getSerializedTimeInfoFromSlot(targetSlot);
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
                    ? timeSlotMatrixByDay[getDayNum(getSerializedTimeInfoFromSlot(targetSlot).day)]?.length === 0
                    : false
                }
                $height={slotValue?.slotHeight}
                $minWidth={slotValue?.slotMinWidth}
                $slotBorderStyle={slotValue?.slotBorderStyle}
                $slotBorderRadius={slotValue?.slotBorderRadius}
                $hoveredSlotColor={slotValue?.hoveredSlotColor}
                $defaultSlotColor={slotValue?.defaultSlotColor}
                $selectedSlotColor={slotValue?.selectedSlotColor}
                $disabledSlotColor={slotValue?.disabledSlotColor}
                $width={slotValue?.slotWidth || DEFAULT_SLOT_WIDTH}
                $isSlotWidthGrow={slotValue?.isSlotWidthGrow || DEFAULT_IS_SLOT_WIDTH_GROW}
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
