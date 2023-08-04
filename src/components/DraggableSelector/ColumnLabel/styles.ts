import styled from 'styled-components';

interface Items {
  $gap?: string;
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
    $columnLabelsColor,
    $columnLabelsMargin,
    $columnLabelsBgColor,
    $columnLabelsFontSize,
    $columnLabelsFontFamily,
    $columnLabelsFontWeight,
    $columnLabelsBorderRadius,
  }) => `
  display: flex;
  color: ${$columnLabelsColor || '#000'};
  background-color: ${$columnLabelsBgColor || 'transparent'};

  margin: ${$columnLabelsMargin || '0px'};
  border-radius: ${$columnLabelsBorderRadius || '0px'};
  column-gap: ${$gap || $gap === '0' || $gap === '0px' ? $gap : '5px'};
  
  font-size: ${$columnLabelsFontSize || '12px'};
  font-weight: ${$columnLabelsFontWeight || 600};
  font-family: ${$columnLabelsFontFamily || 'Pretendard-Regular'};
`,
);

interface ItemProps {
  $width?: string;
  $height?: string;
}
export const Item = styled.li<ItemProps>(
  ({ $height, $width }) => `  
  display: flex;
  align-items: center;
  justify-content: center;
  
  width: 100%;
  height: ${$height || '30px'};
  min-width: ${$width || '30px'};  
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

  padding: ${$padding || '0px 10px'};
  border-radius: ${$columnLabelBorderRadius || '0px'};
  background-color: ${$columnLabelBgColor || 'transparent'};
`,
);
