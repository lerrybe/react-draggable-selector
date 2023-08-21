import { useState } from 'react';
import { TimeSlot } from '../../types';
import { sampleDates } from '../../data/options';
import { DraggableSelector } from '../../../src/index';
import {
  DEFAULT_ROW_GAP,
  DEFAULT_COLUMN_GAP,
  DEFAULT_SLOT_WIDTH,
  DEFAULT_SLOT_HEIGHT,
  DEFAULT_SLOT_BG_COLOR,
  DEFAULT_SLOT_MIN_WIDTH,
  DEFAULT_IS_CURSOR_POINTER,
  DEFAULT_SLOT_BORDER_STYLE,
  DEFAULT_SLOT_BORDER_RADIUS,
  DEFAULT_IS_SLOT_WIDTH_GROW,
  DEFAULT_HOVERED_SLOT_BG_COLOR,
  DEFAULT_DISABLED_SLOT_BG_COLOR,
  DEFAULT_SELECTED_SLOT_BG_COLOR,
  DEFAULT_SLOT_CONTAINER_BORDER_STYLE,
} from '../../../src/constant/options';

function ControlSlotStyle({
  slotRowGap = DEFAULT_ROW_GAP,
  slotWidth = DEFAULT_SLOT_WIDTH,
  slotHeight = DEFAULT_SLOT_HEIGHT,
  slotColumnGap = DEFAULT_COLUMN_GAP,
  slotMinWidth = DEFAULT_SLOT_MIN_WIDTH,
  defaultSlotColor = DEFAULT_SLOT_BG_COLOR,
  slotBorderStyle = DEFAULT_SLOT_BORDER_STYLE,
  isCursorPointer = DEFAULT_IS_CURSOR_POINTER,
  isSlotWidthGrow = DEFAULT_IS_SLOT_WIDTH_GROW,
  slotBorderRadius = DEFAULT_SLOT_BORDER_RADIUS,
  hoveredSlotColor = DEFAULT_HOVERED_SLOT_BG_COLOR,
  disabledSlotColor = DEFAULT_DISABLED_SLOT_BG_COLOR,
  selectedSlotColor = DEFAULT_SELECTED_SLOT_BG_COLOR,
  slotContainerBorderStyle = DEFAULT_SLOT_CONTAINER_BORDER_STYLE,
}: {
  /*
   * The width of each slot.
   * Assign the value in string, e.g. `30px`, `1rem`, `1em`.
   * if `isSlotWidthGrow` is true, this value will be ignored.
   */
  slotWidth?: string;
  /**
   * The height of each slot.
   * Assign the value in string, e.g. `30px`, `1rem`, `1em`.
   */
  slotHeight?: string;
  /**
   * The minimum width of each slot.
   * Assign the value in string, e.g. `40px`, `1rem`, `1em`.
   */
  slotMinWidth?: string;
  /**
   * The row-gap between each slot.
   * Assign the value in string, e.g. `2px`, `1rem`, `1em`.
   */
  slotRowGap?: string;
  /**
   * The column-gap between each slot.
   * Assign the value in string, e.g. `2px`, `1rem`, `1em`.
   */
  slotColumnGap?: string;
  /**
   * The color of each slot.
   * Assign the value in string, e.g. `#000`, `#fff`, `#d77373`.
   */
  defaultSlotColor?: string;
  /**
   * The color of each slot when it is hovered.
   * Assign the value in string, e.g. `#000`, `#fff`, `#d77373`.
   */
  hoveredSlotColor?: string;
  /**
   * The color of each slot when it is selected.
   * Assign the value in string, e.g. `#000`, `#fff`, `#d77373`.
   */
  selectedSlotColor?: string;
  /**
   * The color of each slot when it is disabled.
   * Assign the value in string, e.g. `#000`, `#fff`, `#d77373`.
   */
  disabledSlotColor?: string;
  /**
   * The border style of each slot.
   * Assign the value in string, e.g. `1px solid #000`, `2px dashed #fff`.
   */
  slotBorderStyle?: string;
  /**
   * The border radius of each slot.
   * Assign the value in string, e.g. `10px`, `1rem`, `1em`.
   */
  slotBorderRadius?: string;
  /*
   * Whether the width of each slot is growable.
   * If true, the width of each slot will be growable to fit the width of the container.
   */
  isSlotWidthGrow?: boolean;
  /*
   * Whether the cursor is pointer when hovering on each slot.
   */
  isCursorPointer?: boolean;
  /*
   * The border style of the slot container.
   */
  slotContainerBorderStyle?: string;
}) {
  const [selectedDates] = useState<Date[]>(sampleDates);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<TimeSlot[]>([]);

  console.log(isSlotWidthGrow);

  return (
    <DraggableSelector
      endTime={'15:00'}
      startTime={'11:00'}
      dates={selectedDates}
      selectedTimeSlots={selectedTimeSlots}
      setSelectedTimeSlots={setSelectedTimeSlots}
      width={'800px'}
      slotWidth={slotWidth}
      slotHeight={slotHeight}
      slotRowGap={slotRowGap}
      slotMinWidth={slotMinWidth}
      slotColumnGap={slotColumnGap}
      isCursorPointer={isCursorPointer}
      isSlotWidthGrow={isSlotWidthGrow}
      slotBorderStyle={slotBorderStyle}
      slotBorderRadius={slotBorderRadius}
      hoveredSlotColor={hoveredSlotColor}
      defaultSlotColor={defaultSlotColor}
      selectedSlotColor={selectedSlotColor}
      disabledSlotColor={disabledSlotColor}
      slotContainerBorderStyle={slotContainerBorderStyle}
    />
  );
}

export default ControlSlotStyle;
