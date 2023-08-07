import { useState } from 'react';
import { TimeSlot } from '../../types';
import { sampleDates } from '../../data/options.ts';
import { DraggableSelector } from '../../../main.ts';
import {
  DEFAULT_COLUMN_LABEL_BG_COLOR,
  DEFAULT_COLUMN_LABEL_BORDER_RADIUS,
  DEFAULT_COLUMN_LABEL_PADDING,
  DEFAULT_COLUMN_LABELS_BG_COLOR,
  DEFAULT_COLUMN_LABELS_BORDER_RADIUS,
  DEFAULT_COLUMN_LABELS_COLOR,
  DEFAULT_COLUMN_LABELS_FONT_FAMILY,
  DEFAULT_COLUMN_LABELS_FONT_SIZE,
  DEFAULT_COLUMN_LABELS_FONT_WEIGHT,
  DEFAULT_COLUMN_LABELS_HEIGHT,
  DEFAULT_COLUMN_LABELS_MARGIN,
} from '../../../constant/options.ts';

function ControlColumnLabelStyle({
  columnLabelsColor = DEFAULT_COLUMN_LABELS_COLOR,
  columnLabelHeight = DEFAULT_COLUMN_LABELS_HEIGHT,
  columnLabelsBgColor = DEFAULT_COLUMN_LABELS_BG_COLOR,
  columnLabelsMargin = DEFAULT_COLUMN_LABELS_MARGIN,
  columnLabelsBorderRadius = DEFAULT_COLUMN_LABELS_BORDER_RADIUS,
  columnLabelsFontSize = DEFAULT_COLUMN_LABELS_FONT_SIZE,
  columnLabelsFontWeight = DEFAULT_COLUMN_LABELS_FONT_WEIGHT,
  columnLabelsFontFamily = DEFAULT_COLUMN_LABELS_FONT_FAMILY,
  columnLabelPadding = DEFAULT_COLUMN_LABEL_PADDING,
  columnLabelBorderRadius = DEFAULT_COLUMN_LABEL_BORDER_RADIUS,
  columnLabelBgColor = DEFAULT_COLUMN_LABEL_BG_COLOR,
  isColumnLabelInvisible = false,
}: {
  /**
   * Set the height of the (date/day Label) column label .
   * If you set it to `0`, the column label will not be displayed.
   */
  columnLabelHeight?: string;
  /**
   * Set the background color of each column label (date/day Label).
   * Applies to each, not to the entire background color.
   */
  columnLabelBgColor?: string;
  /**
   * Set the padding of the (date/day Label) column label.
   * Applies to each, not to the entire padding. e.g. `10px 20px 10px 20px`
   */
  columnLabelPadding?: string;
  /**
   * Set the border radius of the (date/day Label) column label.
   * Applies to each, not to the entire border radius.
   */
  columnLabelBorderRadius?: string;
  /**
   * Set the color of the (date/day Label) column label.
   * Applies to font color.
   */
  columnLabelsColor?: string;
  /**
   * Set the margin of the (date/day Label) column label.
   * Applies to the ✅ entire margin, not each.
   */
  columnLabelsMargin?: string;
  /**
   * Set the background color of the (date/day Label) column label.
   * Applies to the ✅ entire background color, not each.
   */
  columnLabelsBgColor?: string;
  /**
   * Set the font size of the (date/day Label) column label.
   */
  columnLabelsFontSize?: string;
  /**
   * Set the font weight of the (date/day Label) column label.
   */
  columnLabelsFontWeight?: number;
  /**
   * Set the font family of the column label.
   * e.g. `Arial, Helvetica, sans-serif`
   */
  columnLabelsFontFamily?: string;
  /**
   * Set the border radius of the column label.
   * Applies to the ✅ entire border radius, not each.
   */
  columnLabelsBorderRadius?: string;
  /**
   * Set whether to hide the column label.
   * If you set it to `true`, the column label will not be displayed.
   */
  isColumnLabelInvisible?: boolean;
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
      columnLabelHeight={columnLabelHeight}
      columnLabelBgColor={columnLabelBgColor}
      columnLabelPadding={columnLabelPadding}
      columnLabelBorderRadius={columnLabelBorderRadius}
      columnLabelsColor={columnLabelsColor}
      columnLabelsMargin={columnLabelsMargin}
      columnLabelsBgColor={columnLabelsBgColor}
      columnLabelsFontSize={columnLabelsFontSize}
      columnLabelsFontWeight={columnLabelsFontWeight}
      columnLabelsFontFamily={columnLabelsFontFamily}
      columnLabelsBorderRadius={columnLabelsBorderRadius}
      isColumnLabelInvisible={isColumnLabelInvisible}
    />
  );
}

export default ControlColumnLabelStyle;
