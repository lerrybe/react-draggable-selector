import styled from 'styled-components';
import {
  DEFAULT_ROW_GAP,
  DEFAULT_SLOT_HEIGHT,
  DEFAULT_ROW_LABELS_COLOR,
  DEFAULT_ROW_LABELS_MARGIN,
  DEFAULT_ROW_LABEL_PADDING,
  DEFAULT_ROW_LABEL_BG_COLOR,
  DEFAULT_ROW_LABELS_BG_COLOR,
  DEFAULT_ROW_LABELS_FONT_SIZE,
  DEFAULT_ROW_LABELS_FONT_WEIGHT,
  DEFAULT_ROW_LABELS_FONT_FAMILY,
  DEFAULT_ROW_LABEL_BORDER_RADIUS,
  DEFAULT_ROW_LABELS_BORDER_RADIUS,
} from '../../../constant/options';

interface Items {
  $gap?: string;
  $rowLabelsColor?: string;
  $rowLabelsMargin?: string;
  $rowLabelsBgColor?: string;
  $rowLabelsFontSize?: string;
  $rowLabelsFontFamily?: string;
  $rowLabelsFontWeight?: number;
  $rowLabelsBorderRadius?: string;
}
export const Items = styled.ul<Items>(
  ({
    $gap,
    $rowLabelsColor,
    $rowLabelsMargin,
    $rowLabelsBgColor,
    $rowLabelsFontSize,
    $rowLabelsFontFamily,
    $rowLabelsFontWeight,
    $rowLabelsBorderRadius,
  }) => `
  display: flex;
  flex-direction: column;
  margin: ${$rowLabelsMargin || DEFAULT_ROW_LABELS_MARGIN};
  border-radius: ${$rowLabelsBorderRadius || DEFAULT_ROW_LABELS_BORDER_RADIUS};
  row-gap: ${$gap || $gap === '0' || $gap === '0px' ? $gap : DEFAULT_ROW_GAP};
 
  color: ${$rowLabelsColor || DEFAULT_ROW_LABELS_COLOR};
  background-color: ${$rowLabelsBgColor || DEFAULT_ROW_LABELS_BG_COLOR};
 
  font-size: ${$rowLabelsFontSize || DEFAULT_ROW_LABELS_FONT_SIZE};
  font-weight: ${$rowLabelsFontWeight || DEFAULT_ROW_LABELS_FONT_WEIGHT};
  font-family: ${$rowLabelsFontFamily || DEFAULT_ROW_LABELS_FONT_FAMILY};
`,
);

interface ItemProps {
  $height?: string;
}
export const Item = styled.li<ItemProps>(
  ({ $height }) => `
  display: flex;
  align-items: center;
  justify-content: center;
  
  width: 100%;
  height: ${$height || DEFAULT_SLOT_HEIGHT};
`,
);

interface LabelProps {
  $padding?: string;
  $rowLabelBgColor?: string;
  $rowLabelBorderRadius?: string;
}

export const Label = styled.div<LabelProps>(
  ({ $padding, $rowLabelBorderRadius, $rowLabelBgColor }) => `
  width: auto;
  height: auto;

  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${$padding || DEFAULT_ROW_LABEL_PADDING};
  background-color: ${$rowLabelBgColor || DEFAULT_ROW_LABEL_BG_COLOR};
  border-radius: ${$rowLabelBorderRadius || DEFAULT_ROW_LABEL_BORDER_RADIUS};
`,
);
