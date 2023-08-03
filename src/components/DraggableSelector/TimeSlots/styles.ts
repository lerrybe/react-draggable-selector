import styled from 'styled-components';

interface ItemsGridProps {
  rows: string;
  cols: string;
  rowGap?: number;
  columnGap?: number;
}

export const ItemsGrid = styled.ul<ItemsGridProps>(
  ({ rows, cols, rowGap, columnGap }) => `
  display: grid;
  grid-template-rows: ${rows};
  grid-template-columns: ${cols};
  
  row-gap: ${rowGap || '5px'};
  column-gap: ${columnGap || '5px'};
`,
);

interface ItemProps {
  selected: boolean;

  height?: number;
  width?: number;
}

export const Item = styled.div<ItemProps>(
  ({ selected, width, height }) => `
  background-color: ${selected ? '#a2d7b4' : '#f1f1f1'};
  
  // border: 1px solid transparent; /* 기본적으로는 투명한 border를 지정합니다. */
  // box-shadow: 0 0 0 0.5px transparent;
  cursor: pointer;
 
  width: 100%;
  min-width: ${width ? width : '30px'};  
  height: ${height ? height : '30px'};
  
  &:hover {
    background-color: #d4f1dd;
  }
`,
);
