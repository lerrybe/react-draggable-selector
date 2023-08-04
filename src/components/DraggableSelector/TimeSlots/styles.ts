import styled from 'styled-components';

interface ItemsGridProps {
  $rows: string;
  $cols: string;
  $rowGap?: string;
  $columnGap?: string;
}

export const ItemsGrid = styled.ul<ItemsGridProps>(
  ({ $rows, $cols, $rowGap, $columnGap }) => `
  display: grid;
  grid-template-rows: ${$rows};
  grid-template-columns: ${$cols};
  row-gap: ${$rowGap || $rowGap === '0' || $rowGap === '0px' ? $rowGap : '5px'};
  column-gap: ${
    $columnGap || $columnGap === '0' || $columnGap === '0px'
      ? $columnGap
      : '5px'
  };
`,
);

interface ItemProps {
  selected: boolean;
  $selectDisabled: boolean;
  $height?: string;
  $width?: string;
  $defaultSlotColor?: string;
  $selectedSlotColor?: string;
  $hoveredSlotColor?: string;
  $slotBorderStyle?: string;
  $slotBorderRadius?: string;
}

export const Item = styled.div<ItemProps>(
  ({
    selected,
    $selectDisabled,
    $width,
    $height,
    $defaultSlotColor,
    $hoveredSlotColor,
    $selectedSlotColor,
    $slotBorderStyle,
    $slotBorderRadius,
  }) => `
  background-color: ${
    selected ? $selectedSlotColor || '#a2d7b4' : $defaultSlotColor || '#f1f1f1'
  };
  width: 100%;
  min-width: ${$width || '30px'};  
  height: ${$height || '30px'};
  cursor: pointer;
  box-sizing: border-box;
  border: ${$slotBorderStyle || 'none'};
  border-radius: ${$slotBorderRadius || '0px'};
  
  &:hover {
    background-color: ${$hoveredSlotColor || '#d4f1dd'};
  }

  ${$selectDisabled ? 'background-color: gray;' : ''}
  ${$selectDisabled ? 'cursor: not-allowed;' : ''}
  ${$selectDisabled ? '&:hover { background-color: gray; }' : ''} 
`,
);
