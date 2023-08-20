import styled from 'styled-components';
import {
  DEFAULT_COLUMN_GAP,
  DEFAULT_SLOT_MIN_WIDTH,
  DEFAULT_COLUMN_LABELS_COLOR,
  DEFAULT_COLUMN_LABELS_MARGIN,
  DEFAULT_COLUMN_LABELS_HEIGHT,
  DEFAULT_COLUMN_LABEL_PADDING,
  DEFAULT_COLUMN_LABEL_BG_COLOR,
  DEFAULT_COLUMN_LABELS_BG_COLOR,
  DEFAULT_COLUMN_LABELS_FONT_SIZE,
  DEFAULT_COLUMN_LABELS_FONT_WEIGHT,
  DEFAULT_COLUMN_LABELS_FONT_FAMILY,
  DEFAULT_COLUMN_LABEL_BORDER_RADIUS,
  DEFAULT_COLUMN_LABELS_BORDER_RADIUS,
  DEFAULT_SLOT_WIDTH,
} from '../../../constant/options';

interface Items {
  $gap?: string;
  $isSlotWidthGrow?: boolean;
  $columnLabelsColor?: string;
  $columnLabelsMargin?: string;
  $columnLabelsBgColor?: string;
  $columnLabelsFontSize?: string;
  $columnLabelsFontFamily?: string;
  $columnLabelsFontWeight?: number;
  $columnLabelsBorderRadius?: string;
}
export const Items = styled.ul<Items>(
  ({
    $gap,
    $isSlotWidthGrow,
    $columnLabelsColor,
    $columnLabelsMargin,
    $columnLabelsBgColor,
    $columnLabelsFontSize,
    $columnLabelsFontFamily,
    $columnLabelsFontWeight,
    $columnLabelsBorderRadius,
  }) => `
  display: flex;
  color: ${$columnLabelsColor || DEFAULT_COLUMN_LABELS_COLOR};
  background-color: ${$columnLabelsBgColor || DEFAULT_COLUMN_LABELS_BG_COLOR};
  font-size: ${$columnLabelsFontSize || DEFAULT_COLUMN_LABELS_FONT_SIZE};
  font-weight: ${$columnLabelsFontWeight || DEFAULT_COLUMN_LABELS_FONT_WEIGHT};
  font-family: ${$columnLabelsFontFamily || DEFAULT_COLUMN_LABELS_FONT_FAMILY};
  margin: ${$columnLabelsMargin || DEFAULT_COLUMN_LABELS_MARGIN};
  border-radius: ${
    $columnLabelsBorderRadius || DEFAULT_COLUMN_LABELS_BORDER_RADIUS
  };
  column-gap: ${
    $gap || $gap === '0' || $gap === '0px' ? $gap : DEFAULT_COLUMN_GAP
  };
  width: ${$isSlotWidthGrow ? '100%' : 'auto'};
`,
);

interface ItemProps {
  $width?: string;
  $height?: string;
  $minWidth?: string;
  $isSlotWidthGrow?: boolean;
}
export const Item = styled.li<ItemProps>(
  ({ $height, $width, $minWidth, $isSlotWidthGrow }) => `  
  display: flex;
  align-items: center;
  justify-content: center;
  
  width: ${$isSlotWidthGrow ? '100%' : $width || DEFAULT_SLOT_WIDTH};
  min-width: ${$minWidth || DEFAULT_SLOT_MIN_WIDTH};  
  height: ${$height || DEFAULT_COLUMN_LABELS_HEIGHT};
`,
);

interface LabelProps {
  $padding?: string;
  $columnLabelBgColor?: string;
  $columnLabelBorderRadius?: string;
}

export const Label = styled.div<LabelProps>(
  ({ $padding, $columnLabelBgColor, $columnLabelBorderRadius }) => `
  width: auto;
  height: auto;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: ${$padding || DEFAULT_COLUMN_LABEL_PADDING};
  background-color: ${$columnLabelBgColor || DEFAULT_COLUMN_LABEL_BG_COLOR};
  border-radius: ${
    $columnLabelBorderRadius || DEFAULT_COLUMN_LABEL_BORDER_RADIUS
  };
`,
);
