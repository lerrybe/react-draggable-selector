import * as S from './styles';
import { TimeSlot } from '../../../types/timeInfo';
import { areTimeSlotsEqual } from '../../../utils/time';

interface TimeSlotsProps {
  mode: 'day' | 'date';
  slotWidth: number;
  slotHeight: number;
  defaultSlotColor: string;
  selectedSlotColor: string;
  disabledSlotColor: string;
  hoveredSlotColor: string;
  slotsContainerBorder: string;
  slotsContainerBorderRadius: string;
  timeSlotMatrix?: TimeSlot[][];
  cachedMatrixByDay: TimeSlot[][];
  cachedSelectedTimeSlots?: TimeSlot[];
  handleMouseUp: (timeSlot: TimeSlot) => void;
  handleMouseDown: (timeSlot: TimeSlot) => void;
  handleMouseEnter: (timeSlot: TimeSlot) => void;
}

const TimeSlots = ({
  mode,
  slotWidth,
  slotHeight,
  defaultSlotColor,
  selectedSlotColor,
  disabledSlotColor,
  hoveredSlotColor,
  slotsContainerBorder,
  slotsContainerBorderRadius,
  timeSlotMatrix,
  cachedMatrixByDay,
  handleMouseUp,
  handleMouseDown,
  handleMouseEnter,
  cachedSelectedTimeSlots,
}: TimeSlotsProps) => {
  if (!timeSlotMatrix) {
    return <></>;
  }

  const cols: number = timeSlotMatrix?.length;
  const rows: number = timeSlotMatrix[0]?.length;

  const gridTemplateRows: string = `repeat(${rows}, 1fr)`;
  const gridTemplateColumns: string = `repeat(${cols}, 1fr)`;

  return (
    <S.Grid
      $gridTemplateRows={gridTemplateRows}
      $gridTemplateColumns={gridTemplateColumns}
      $slotsContainerBorder={slotsContainerBorder}
      $slotsContainerBorderRadius={slotsContainerBorderRadius}
    >
      {timeSlotMatrix[0]?.map(
        (_, colIndex: number) =>
          timeSlotMatrix?.map(timeSlots => {
            const target = timeSlots[colIndex];
            const isDisabled =
              mode === 'day' && (cachedMatrixByDay.length === 0 || cachedMatrixByDay[target?.day]?.length === 0);
            const selected = isDisabled
              ? false
              : Boolean(cachedSelectedTimeSlots?.find(slot => areTimeSlotsEqual(slot, target)));

            const isEvenIdx = colIndex % 2 === 0;
            const lastDate = timeSlotMatrix[cols - 1][0]?.date;
            const lastMinTime = timeSlotMatrix[0][rows - 1]?.minTime;
            const isRightSide = target?.date === lastDate;
            const isBottomSide = target?.minTime === lastMinTime;

            return (
              <S.Slot
                $width={slotWidth}
                $height={slotHeight}
                $isDisabled={isDisabled}
                $isEvenIdx={isEvenIdx}
                $isRightMost={isRightSide}
                $isBottomMost={isBottomSide}
                $defaultSlotColor={defaultSlotColor}
                $selectedSlotColor={selectedSlotColor}
                $disabledSlotColor={disabledSlotColor}
                $hoveredSlotColor={hoveredSlotColor}
                $selected={selected}
                key={`${target?.date}-${target?.minTime}`}
                onMouseUp={() => {
                  !isDisabled && handleMouseUp(target);
                }}
                onMouseDown={() => {
                  !isDisabled && handleMouseDown(target);
                }}
                onMouseEnter={() => {
                  !isDisabled && handleMouseEnter(target);
                }}
              />
            );
          }),
      )}
    </S.Grid>
  );
};

export default TimeSlots;
