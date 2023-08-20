import styled from 'styled-components';
import {
  DEFAULT_ROW_GAP,
  DEFAULT_COLUMN_GAP,
  DEFAULT_SLOT_HEIGHT,
  DEFAULT_SLOT_BG_COLOR,
  DEFAULT_SLOT_MIN_WIDTH,
  DEFAULT_SLOT_BORDER_STYLE,
  DEFAULT_SLOT_BORDER_RADIUS,
  DEFAULT_HOVERED_SLOT_BG_COLOR,
  DEFAULT_SELECTED_SLOT_BG_COLOR,
  DEFAULT_DISABLED_SLOT_BG_COLOR,
} from '../../../constant/options';

interface ItemsGridProps {
  $rows: string;
  $cols: string;
  $rowGap?: string;
  $columnGap?: string;
  $isSlotWidthGrow?: boolean;
}

export const ItemsGrid = styled.ul<ItemsGridProps>(
  ({ $rows, $cols, $rowGap, $columnGap, $isSlotWidthGrow }) => `
  display: grid;
  grid-template-rows: ${$rows};
  grid-template-columns: ${$cols};
  row-gap: ${
    $rowGap || $rowGap === '0' || $rowGap === '0px' ? $rowGap : DEFAULT_ROW_GAP
  };
  column-gap: ${
    $columnGap || $columnGap === '0' || $columnGap === '0px'
      ? $columnGap
      : DEFAULT_COLUMN_GAP
  };
  width: ${$isSlotWidthGrow ? '100%' : 0};
`,
);

interface ItemProps {
  selected: boolean;
  $height?: string;
  $width?: string;
  $minWidth?: string;
  $isSlotWidthGrow?: boolean;
  $selectDisabled: boolean;
  $defaultSlotColor?: string;
  $selectedSlotColor?: string;
  $hoveredSlotColor?: string;
  $slotBorderStyle?: string;
  $slotBorderRadius?: string;
  $disabledSlotColor?: string;
}

export const Item = styled.button<ItemProps>(
  ({
    selected,
    $selectDisabled,
    $width,
    $height,
    $minWidth,
    $isSlotWidthGrow,
    $defaultSlotColor,
    $hoveredSlotColor,
    $selectedSlotColor,
    $slotBorderStyle,
    $slotBorderRadius,
    $disabledSlotColor,
  }) => `
  background-color: ${
    selected
      ? $selectedSlotColor || DEFAULT_SELECTED_SLOT_BG_COLOR
      : $defaultSlotColor || DEFAULT_SLOT_BG_COLOR
  };
  user-drag: none; /* 최신 브라우저 */
  -webkit-user-drag: none; /* 구형 브라우저 */
  
  width: ${$isSlotWidthGrow ? '100%' : $width};
  min-width: ${$minWidth || DEFAULT_SLOT_MIN_WIDTH};  
  height: ${$height || DEFAULT_SLOT_HEIGHT};
  cursor: pointer;
  box-sizing: border-box;
  border: ${$slotBorderStyle || DEFAULT_SLOT_BORDER_STYLE};
  border-radius: ${$slotBorderRadius || DEFAULT_SLOT_BORDER_RADIUS};
  
  &:hover {
    background-color: ${
      $selectDisabled
        ? DEFAULT_DISABLED_SLOT_BG_COLOR
        : $hoveredSlotColor || DEFAULT_HOVERED_SLOT_BG_COLOR
    };
  }

  ${$selectDisabled ? 'cursor: not-allowed;' : ''}
  ${
    $selectDisabled
      ? `background-color: ${
          $disabledSlotColor || DEFAULT_DISABLED_SLOT_BG_COLOR
        };`
      : ''
  }
`,
);
