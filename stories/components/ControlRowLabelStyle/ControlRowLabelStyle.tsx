import { useState } from 'react';
import { TimeSlot } from '../../types';
import { sampleDates } from '../../data/options';
import { DraggableSelector } from '../../../src/index';
import {
  DEFAULT_ROW_LABEL_WIDTH,
  DEFAULT_ROW_LABELS_COLOR,
  DEFAULT_ROW_LABEL_PADDING,
  DEFAULT_ROW_LABELS_MARGIN,
  DEFAULT_ROW_LABEL_BG_COLOR,
  DEFAULT_ROW_LABELS_BG_COLOR,
  DEFAULT_ROW_LABELS_FONT_SIZE,
  DEFAULT_ROW_LABELS_FONT_WEIGHT,
  DEFAULT_ROW_LABELS_FONT_FAMILY,
  DEFAULT_ROW_LABEL_BORDER_RADIUS,
  DEFAULT_ROW_LABELS_BORDER_RADIUS,
} from '../../../src/constant/options';

function ControlRowLabelStyle({
  isRowLabelInvisible = false,
  rowLabelWidth = DEFAULT_ROW_LABEL_WIDTH,
  rowLabelsColor = DEFAULT_ROW_LABELS_COLOR,
  rowLabelPadding = DEFAULT_ROW_LABEL_PADDING,
  rowLabelsMargin = DEFAULT_ROW_LABELS_MARGIN,
  rowLabelBgColor = DEFAULT_ROW_LABEL_BG_COLOR,
  rowLabelsBgColor = DEFAULT_ROW_LABELS_BG_COLOR,
  rowLabelsFontSize = DEFAULT_ROW_LABELS_FONT_SIZE,
  rowLabelsFontWeight = DEFAULT_ROW_LABELS_FONT_WEIGHT,
  rowLabelsFontFamily = DEFAULT_ROW_LABELS_FONT_FAMILY,
  rowLabelBorderRadius = DEFAULT_ROW_LABEL_BORDER_RADIUS,
  rowLabelsBorderRadius = DEFAULT_ROW_LABELS_BORDER_RADIUS,
}: {
  /**
   * Set the width of the (time Label) row label .
   * If you set it to `0`, the row label will not be displayed.
   */
  rowLabelWidth?: string;
  /**
   * Set the background color of each row label (time Label).
   * Applies to each, not to the entire background color.
   */
  rowLabelBgColor?: string;
  /**
   * Set the padding of the (time Label) row label.
   * Applies to each, not to the entire padding. e.g. `10px 20px 10px 20px`
   */
  rowLabelPadding?: string;
  /**
   * Set the border radius of the (time Label) row label.
   * Applies to each, not to the entire border radius.
   */
  rowLabelBorderRadius?: string;
  /**
   * Set the color of the (time Label) row label.
   * Applies to font color.
   */
  rowLabelsColor?: string;
  /**
   * Set the margin of the (time Label) row label.
   * Applies to the ✅ entire margin, not each.
   */
  rowLabelsMargin?: string;
  /**
   * Set the background color of the (time Label) row label.
   * Applies to the ✅ entire background color, not each.
   */
  rowLabelsBgColor?: string;
  /**
   * Set the font size of the (time Label) row label.
   */
  rowLabelsFontSize?: string;
  /**
   * Set the font weight of the (time Label) row label.
   */
  rowLabelsFontWeight?: number;
  /**
   * Set the font family of the row label.
   * e.g. `Arial, Helvetica, sans-serif`
   */
  rowLabelsFontFamily?: string;
  /**
   * Set the border radius of the row label.
   * Applies to the ✅ entire border radius, not each.
   */
  rowLabelsBorderRadius?: string;
  /**
   * Set whether to hide the row label.
   * If you set it to `true`, the row label will not be displayed.
   */
  isRowLabelInvisible?: boolean;
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
      rowLabelWidth={rowLabelWidth}
      rowLabelsColor={rowLabelsColor}
      rowLabelBgColor={rowLabelBgColor}
      rowLabelPadding={rowLabelPadding}
      rowLabelsMargin={rowLabelsMargin}
      rowLabelsBgColor={rowLabelsBgColor}
      rowLabelsFontSize={rowLabelsFontSize}
      isRowLabelInvisible={isRowLabelInvisible}
      rowLabelsFontWeight={rowLabelsFontWeight}
      rowLabelsFontFamily={rowLabelsFontFamily}
      rowLabelBorderRadius={rowLabelBorderRadius}
      rowLabelsBorderRadius={rowLabelsBorderRadius}
    />
  );
}

export default ControlRowLabelStyle;
