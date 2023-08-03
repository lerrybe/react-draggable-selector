import styled from 'styled-components';

interface ItemProps {
  selected: boolean;
}

interface ItemsGridProps {
  rows?: string;
  cols?: string;
}

export const ItemsGrid = styled.ul<ItemsGridProps>(
  ({ rows, cols }) => `
  display: grid;
  row-gap: 5px;
  column-gap: 5px;
  grid-template-rows: ${rows || 'repeat(4, 1fr)'};
  grid-template-columns: ${cols || 'repeat(4, 1fr)'};
`,
);

export const Item = styled.div<ItemProps>(
  ({ selected }) => `
  background-color: ${selected ? '#a2d7b4' : '#f1f1f1'};
  border: 1px solid transparent; /* 기본적으로는 투명한 border를 지정합니다. */
  box-shadow: 0 0 0 0.5px transparent;
  cursor: pointer;
  
  &:hover {
    background-color: #d4f1dd;
  }
`,
);
