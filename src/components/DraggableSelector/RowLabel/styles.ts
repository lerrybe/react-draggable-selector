import styled from 'styled-components';

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
 
  color: ${$rowLabelsColor || '#000'};
  background-color: ${$rowLabelsBgColor || 'transparent'};
 
  margin: ${$rowLabelsMargin || '0px'};
  border-radius: ${$rowLabelsBorderRadius || '0px'};
  row-gap: ${$gap || $gap === '0' || $gap === '0px' ? $gap : '5px'};
  
  font-size: ${$rowLabelsFontSize || '12px'};
  font-weight: ${$rowLabelsFontWeight || 600};
  font-family: ${$rowLabelsFontFamily || 'Pretendard-Regular'};
`,
);

interface ItemProps {
  $height?: string;
}
export const Item = styled.li<ItemProps>(
  ({ $height }) => `
  width: 100%;
  height: ${$height || '30px'};

  display: flex;
  align-items: center;
  justify-content: center;
`,
);

interface LabelProps {
  $padding?: string;
  $rowLabelBorderRadius?: string;
  $rowLabelBgColor?: string;
}

export const Label = styled.div<LabelProps>(
  ({ $padding, $rowLabelBorderRadius, $rowLabelBgColor }) => `
  width: auto;
  height: auto;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${$padding || '0px 10px'};
  border-radius: ${$rowLabelBorderRadius || '0px'};
  background-color: ${$rowLabelBgColor || 'transparent'};
`,
);
