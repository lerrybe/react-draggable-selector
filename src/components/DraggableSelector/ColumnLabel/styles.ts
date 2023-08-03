import styled from 'styled-components';

interface Items {
  gap?: number;
}

export const Items = styled.ul<Items>(
  ({ gap }) => `
  display: flex;
  column-gap: ${gap || 5}px;
`,
);

interface ItemProps {
  width?: number;
  height?: number;
}

export const Item = styled.li<ItemProps>(
  ({ height, width }) => `  
  width: 100%;
  min-width: ${width || 30}px;  
  height: ${height || 30}px;
  
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-family: 'Pretendard-Regular';
`,
);
