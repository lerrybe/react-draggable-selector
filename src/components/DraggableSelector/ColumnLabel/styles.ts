import styled from 'styled-components';

interface Items {
  $gap?: string;
  $columnLabelsBgColor?: string;
  $columnLabelsBorderRadius?: string;
  $columnLabelsColor?: string;
  $columnLabelsFontWeight?: number;
  $columnLabelsMargin?: string;
  $columnLabelsFontSize?: string;
  $columnLabelsFontFamily?: string;
}

export const Items = styled.ul<Items>(
  ({
    $gap,
    $columnLabelsBgColor,
    $columnLabelsBorderRadius,
    $columnLabelsColor,
    $columnLabelsFontWeight,
    $columnLabelsMargin,
    $columnLabelsFontSize,
    $columnLabelsFontFamily,
  }) => `
  display: flex;
  column-gap: ${$gap || $gap === '0' || $gap === '0px' ? $gap : '5px'};
  background-color: ${$columnLabelsBgColor || 'transparent'};
  border-radius: ${$columnLabelsBorderRadius || '0px'};
  color: ${$columnLabelsColor || '#000'};
  font-weight: ${$columnLabelsFontWeight || 600};
  margin: ${$columnLabelsMargin || '0px'};
  font-size: ${$columnLabelsFontSize || '12px'};
  font-family: ${$columnLabelsFontFamily || 'Pretendard-Regular'};
`,
);

interface ItemProps {
  $width?: string;
  $height?: string;
}

export const Item = styled.li<ItemProps>(
  ({ $height, $width }) => `  
  width: 100%;
  min-width: ${$width || '30px'};  
  height: ${$height || '30px'};
  
  display: flex;
  justify-content: center;
  align-items: center;
`,
);

interface LabelProps {
  $padding?: string;
  $columnLabelBorderRadius?: string;
  $columnLabelBgColor?: string;
}

export const Label = styled.div<LabelProps>(
  ({ $padding, $columnLabelBorderRadius, $columnLabelBgColor }) => `
  width: auto;
  height: auto;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${$padding || '0px 10px'};
  border-radius: ${$columnLabelBorderRadius || '0px'};
  background-color: ${$columnLabelBgColor || 'transparent'};
`,
);
