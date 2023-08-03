import styled from 'styled-components';

interface ItemsGridProps {
  rows: string;
  cols: string;
  rowgap?: number;
  colgap?: number;
}

export const ItemsGrid = styled.ul<ItemsGridProps>(
  ({ rows, cols, rowgap, colgap }) => `
  display: grid;
  grid-template-rows: ${rows};
  grid-template-columns: ${cols};
  
  row-gap: ${rowgap || 5}px;
  column-gap: ${colgap || 5}px;
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
  min-width: ${width || 30}px;  
  height: ${height || 30}px;
  
  &:hover {
    background-color: #d4f1dd;
  }
`,
);
