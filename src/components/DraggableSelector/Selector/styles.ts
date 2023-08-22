import styled from '@emotion/styled';

interface ContainerProps {
  $maxWidth: string;
  $maxHeight: string;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  overflow-y: auto;
  padding-right: 12px;
  box-sizing: border-box;

  width: max-content;
  max-width: ${({ $maxWidth }) => $maxWidth};
  max-height: ${({ $maxHeight }) => $maxHeight};

  &::-webkit-scrollbar {
    width: 8px; /* WIDTH, HEIGHT */
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    margin-top: 8px;
    height: 30%; /* LENGTH */
    background: #8c8d94; /* COLOR */
    border-radius: 5px;
  }

  &::-webkit-scrollbar-track {
    margin-top: 8px;
    background: #eff0f5; /* BG COLOR */
    border-radius: 5px;
  }
`;

interface EmptySlotProps {
  $marginBottom: number;
}

export const EmptySlot = styled.div<EmptySlotProps>`
  height: 24px;
  display: flex;
  margin-bottom: ${({ $marginBottom }) => $marginBottom}px;
`;

interface ContainerLProps {
  $marginRight: number;
}

export const ContainerL = styled.div<ContainerLProps>`
  margin-right: ${({ $marginRight }) => $marginRight}px;
`;

export const ContainerR = styled.div`
  overflow-x: auto;
  height: fit-content;
  padding-bottom: 8px;
  max-width: 100%;

  &::-webkit-scrollbar {
    width: 8px; /* WIDTH, HEIGHT */
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    height: 30%; /* LENGTH */
    background: #8c8d94; /* COLOR */
    border-radius: 5px;
  }

  &::-webkit-scrollbar-track {
    background: #eff0f5; /* BG COLOR */
    border-radius: 5px;
  }
`;
