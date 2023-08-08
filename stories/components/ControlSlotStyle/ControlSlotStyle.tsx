import { useState } from 'react';
import { TimeSlot } from '../../types';
import { sampleDates } from '../../data/options';
import { DraggableSelector } from '../../../src/index';
import {
  DEFAULT_COLUMN_GAP,
  DEFAULT_DISABLED_SLOT_BG_COLOR,
  DEFAULT_HOVERED_SLOT_BG_COLOR,
  DEFAULT_ROW_GAP,
  DEFAULT_SELECTED_SLOT_BG_COLOR,
  DEFAULT_SLOT_BG_COLOR,
  DEFAULT_SLOT_BORDER_RADIUS,
  DEFAULT_SLOT_BORDER_STYLE,
  DEFAULT_SLOT_HEIGHT,
  DEFAULT_SLOT_MIN_WIDTH,
} from '../../../src/constant/options';

function ControlSlotStyle({
  slotRowGap = DEFAULT_ROW_GAP,
  slotColumnGap = DEFAULT_COLUMN_GAP,
  slotMinWidth = DEFAULT_SLOT_MIN_WIDTH,
  slotHeight = DEFAULT_SLOT_HEIGHT,
  defaultSlotColor = DEFAULT_SLOT_BG_COLOR,
  selectedSlotColor = DEFAULT_SELECTED_SLOT_BG_COLOR,
  hoveredSlotColor = DEFAULT_HOVERED_SLOT_BG_COLOR,
  disabledSlotColor = DEFAULT_DISABLED_SLOT_BG_COLOR,
  slotBorderStyle = DEFAULT_SLOT_BORDER_STYLE,
  slotBorderRadius = DEFAULT_SLOT_BORDER_RADIUS,
}: {
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
}) {
  const [selectedDates] = useState<Date[]>(sampleDates);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<TimeSlot[]>([]);

  return (
    <DraggableSelector
      endTime={'15:00'}
      startTime={'11:00'}
      dates={selectedDates}
      selectedTimeSlots={selectedTimeSlots}
      setSelectedTimeSlots={setSelectedTimeSlots}
      slotRowGap={slotRowGap}
      slotColumnGap={slotColumnGap}
      slotMinWidth={slotMinWidth}
      slotHeight={slotHeight}
      defaultSlotColor={defaultSlotColor}
      selectedSlotColor={selectedSlotColor}
      hoveredSlotColor={hoveredSlotColor}
      disabledSlotColor={disabledSlotColor}
      slotBorderStyle={slotBorderStyle}
      slotBorderRadius={slotBorderRadius}
    />
  );
}

export default ControlSlotStyle;
