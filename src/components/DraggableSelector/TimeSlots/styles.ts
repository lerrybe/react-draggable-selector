import styled from '@emotion/styled';

interface GridProps {
  $gridTemplateRows: string;
  $gridTemplateColumns: string;
  $slotsContainerBorder: string;
  $slotsContainerBorderRadius: string;
}

export const Grid = styled.div<GridProps>`
  display: grid;
  width: fit-content;

  overflow: hidden;
  border: ${({ $slotsContainerBorder }) => $slotsContainerBorder};
  border-radius: ${({ $slotsContainerBorderRadius }) => $slotsContainerBorderRadius};

  grid-template-rows: ${({ $gridTemplateRows }) => $gridTemplateRows};
  grid-template-columns: ${({ $gridTemplateColumns }) => $gridTemplateColumns};
`;

interface SlotProps {
  $width: number;
  $height: number;
  $selected: boolean;
  $isDisabled: boolean;
  $isEvenIdx: boolean;
  $isRightMost: boolean;
  $isBottomMost: boolean;
  $defaultSlotColor: string;
  $selectedSlotColor: string;
  $disabledSlotColor: string;
  $hoveredSlotColor: string;
}

export const Slot = styled.div<SlotProps>`
  width: ${({ $width }) => $width}px;
  height: ${({ $height }) => $height}px;

  border-right: 1px solid #8c8d94;
  border-bottom: ${({ $isEvenIdx }) => ($isEvenIdx ? '1px dashed #C2C3CA' : '1px solid #8C8D94')};
  ${({ $isRightMost }) => $isRightMost && 'border-right: none;'}
  ${({ $isBottomMost }) => $isBottomMost && 'border-bottom: none;'}

  user-drag: none;
  -webkit-user-drag: none;

  background-color: ${({ $selected, $defaultSlotColor, $selectedSlotColor }) =>
    $selected ? $selectedSlotColor : $defaultSlotColor};

  ${({ $isDisabled }) => ($isDisabled ? 'cursor: not-allowed;' : '')}
  ${({ $isDisabled, $disabledSlotColor }) => $isDisabled && `background-color: ${$disabledSlotColor};`}
  &:hover {
    background-color: ${({ $isDisabled, $hoveredSlotColor, $disabledSlotColor }) =>
      $isDisabled ? $disabledSlotColor : $hoveredSlotColor};
  }
`;
