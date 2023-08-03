import styled from 'styled-components';

interface Items {
  gap?: number;
}

export const Items = styled.ul<Items>(
  ({ gap }) => `
  display: flex;
  flex-direction: column;
  row-gap: ${gap ? gap : '5px'};
`,
);

interface ItemProps {
  height?: number;
}

export const Item = styled.li<ItemProps>(
  ({ height }) => `
  width: 100%;
  height: ${height ? height : '30px'};

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  font-family: 'Pretendard-Regular';
`,
);
