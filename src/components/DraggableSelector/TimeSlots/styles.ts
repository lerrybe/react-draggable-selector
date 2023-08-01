import styled from "styled-components";

interface SlotProps {
  selected: boolean;
}

export const Wrapper = styled.ul`
  row-gap: 5px;
  column-gap: 5px;
`;

export const Slot = styled.li<SlotProps>(
  ({ selected }) => `
  background-color: ${selected ? "#a2d7b4" : "#f1f1f1"};
  // border: 0.5px solid #8C8D94;
  // outline: 0.5px solid transparent;
  border: 1px solid transparent; /* 기본적으로는 투명한 border를 지정합니다. */
  box-shadow: 0 0 0 0.5px transparent;
  cursor: pointer;
  
  &:hover {
    background-color: #d4f1dd;
  }
`
);
