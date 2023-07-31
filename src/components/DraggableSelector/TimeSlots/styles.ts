import styled from "styled-components";

interface SlotProps {
  selected: boolean;
}

export const Slot = styled.li<SlotProps>(
  ({ selected }) => `
  background-color: ${selected ? "#202632" : "#fff"};
  border: 0.5px solid #8C8D94;
  
  &:hover {
    background-color: #535c6f;
  }
`
);
