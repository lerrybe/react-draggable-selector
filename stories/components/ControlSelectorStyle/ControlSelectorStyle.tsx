import { useState } from 'react';
import { TimeSlot } from '../../types';
import { sampleDates } from '../../data/options';
import { DraggableSelector } from '../../../src/main';
import {
  DEFAULT_WIDTH,
  DEFAULT_HEIGHT,
  DEFAULT_MARGIN,
  DEFAULT_PADDING,
  DEFAULT_MAX_WIDTH,
  DEFAULT_MIN_WIDTH,
  DEFAULT_MAX_HEIGHT,
  DEFAULT_MIN_HEIGHT,
  DEFAULT_SCROLL_COLOR,
  DEFAULT_SCROLL_WIDTH,
  DEFAULT_SCROLL_BG_COLOR,
} from '../../../src/constant/options';

function ControlSelectorStyle({
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  margin = DEFAULT_MARGIN,
  padding = DEFAULT_PADDING,
  minWidth = DEFAULT_MIN_WIDTH,
  maxWidth = DEFAULT_MAX_WIDTH,
  minHeight = DEFAULT_MIN_HEIGHT,
  maxHeight = DEFAULT_MAX_HEIGHT,
  scrollWidth = DEFAULT_SCROLL_WIDTH,
  scrollColor = DEFAULT_SCROLL_COLOR,
  scrollBgColor = DEFAULT_SCROLL_BG_COLOR,
}: {
  /**
   * The width of the selector.
   * You should assign a string to width,
   * such as `100%`, `500px`, `50vw`, etc.
   */
  width?: string;
  /**
   * The height of the selector.
   * You should assign a string to height,
   * such as `100%`, `500px`, `50vh`, etc.
   */
  height?: string;
  /**
   * The margin of the selector.
   * Assign a string to margin,
   * such as `5px 4px 2px 3px`.
   */
  margin?: string;
  /**
   * The padding of the selector.
   * Assign a string to padding,
   * such as `5px 4px 2px 3px`.
   */
  padding?: string;
  /**
   * The minimum width of the selector.
   * You should assign a string to minWidth, such as `100%`, `500px`, `50vw`, etc.
   */
  minWidth?: string;
  /**
   * The maximum width of the selector.
   * Assign a string to maxWidth, such as `100%`, `500px`, `50vw`, etc.
   */
  maxWidth?: string;
  /**
   * The minimum height of the selector.
   * Assign a string to minHeight, such as `100%`, `500px`, `50vh`, etc.
   *
   */
  minHeight?: string;
  /**
   * The maximum height of the selector.
   * Assign a string to maxHeight, such as `100%`, `500px`, `50vh`, etc.
   */
  maxHeight?: string;
  /**
   * The Thickness of the scroll bar.
   * Assign a string to scrollWidth, such as `3px`, `0.5rem`, `0.5em`, etc.
   */
  scrollWidth?: string;
  /**
   * The color of the scroll bar.
   * Assign a string to scrollColor, such as `#595959`, `#fff`, `rgb(0, 0, 0)`, etc.
   */
  scrollColor?: string;
  /**
   * The background color of the scroll bar.
   * Assign a string to scrollBgColor, such as `#e1e1e1`, `blue`, `rgb(0, 0, 0)`, etc.
   */
  scrollBgColor?: string;
}) {
  const [selectedDates] = useState<Date[]>(sampleDates);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<TimeSlot[]>([]);

  return (
    <DraggableSelector
      endTime={'18:00'}
      startTime={'11:00'}
      dates={selectedDates}
      selectedTimeSlots={selectedTimeSlots}
      setSelectedTimeSlots={setSelectedTimeSlots}
      width={width}
      height={height}
      margin={margin}
      padding={padding}
      minWidth={minWidth}
      maxWidth={maxWidth}
      minHeight={minHeight}
      maxHeight={maxHeight}
      scrollWidth={scrollWidth}
      scrollColor={scrollColor}
      scrollBgColor={scrollBgColor}
    />
  );
}

export default ControlSelectorStyle;
