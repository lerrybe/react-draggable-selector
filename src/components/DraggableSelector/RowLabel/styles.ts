import styled from 'styled-components';

interface Items {
  $gap?: string;
  $rowLabelsBgColor?: string;
  $rowLabelsBorderRadius?: string;
  $rowLabelsColor?: string;
  $rowLabelsFontWeight?: number;
  $rowLabelsMargin?: string;
  $rowLabelsFontSize?: string;
  $rowLabelsFontFamily?: string;
}

export const Items = styled.ul<Items>(
  ({
    $gap,
    $rowLabelsBgColor,
    $rowLabelsBorderRadius,
    $rowLabelsColor,
    $rowLabelsFontWeight,
    $rowLabelsMargin,
    $rowLabelsFontSize,
    $rowLabelsFontFamily,
  }) => `
  display: flex;
  flex-direction: column;
  row-gap: ${$gap || $gap === '0' || $gap === '0px' ? $gap : '5px'};
  background-color: ${$rowLabelsBgColor || 'transparent'};
  border-radius: ${$rowLabelsBorderRadius || '0px'};
  color: ${$rowLabelsColor || '#000'};
  font-weight: ${$rowLabelsFontWeight || 600};
  margin: ${$rowLabelsMargin || '0px'};
  font-size: ${$rowLabelsFontSize || '12px'};
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
  justify-content: center;
  align-items: center;
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
