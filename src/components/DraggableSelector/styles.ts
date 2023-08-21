import styled from 'styled-components';
import {
  DEFAULT_WIDTH,
  DEFAULT_HEIGHT,
  DEFAULT_MARGIN,
  DEFAULT_PADDING,
  DEFAULT_MIN_WIDTH,
  DEFAULT_MAX_WIDTH,
  DEFAULT_MIN_HEIGHT,
  DEFAULT_MAX_HEIGHT,
  DEFAULT_SCROLL_COLOR,
  DEFAULT_SCROLL_WIDTH,
  DEFAULT_ROW_LABEL_WIDTH,
  DEFAULT_SCROLL_BG_COLOR,
  DEFAULT_COLUMN_LABELS_HEIGHT,
} from '../../constant/options';

interface ContainerProps {
  $width?: string;
  $height?: string;
  $margin?: string;
  $padding?: string;
  $minWidth?: string;
  $maxWidth?: string;
  $minHeight?: string;
  $maxHeight?: string;
  $scrollWidth?: string;
  $scrollColor?: string;
  $scrollBgColor?: string;
  $isSlotWidthGrow?: boolean;
}
export const Container = styled.div<ContainerProps>(
  ({
    $width,
    $height,
    $margin,
    $padding,
    $minWidth,
    $maxWidth,
    $minHeight,
    $maxHeight,
    $scrollWidth,
    $scrollColor,
    $scrollBgColor,
    $isSlotWidthGrow,
  }) => `  
  display: flex;
  overflow: auto;
  margin: ${$margin || DEFAULT_MARGIN};
  padding: ${$padding || DEFAULT_PADDING};

  height: ${$height || DEFAULT_HEIGHT};
  min-width: ${$minWidth || DEFAULT_MIN_WIDTH};
  max-width: ${$maxWidth || DEFAULT_MAX_WIDTH};
  min-height: ${$minHeight || DEFAULT_MIN_HEIGHT};
  max-height: ${$maxHeight || DEFAULT_MAX_HEIGHT};
  width: ${$isSlotWidthGrow ? 'auto' : $width || DEFAULT_WIDTH};
  
  &::-webkit-scrollbar {
    width: ${$scrollWidth || DEFAULT_SCROLL_WIDTH};  /* WIDTH, HEIGHT */
    height: ${$scrollWidth || DEFAULT_SCROLL_WIDTH};
  }
  &::-webkit-scrollbar-thumb {
    height: 30%; /* LENGTH */
    background: ${$scrollColor || DEFAULT_SCROLL_COLOR}; /* COLOR */
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background: ${$scrollBgColor || DEFAULT_SCROLL_BG_COLOR};  /* BG COLOR */
  }
`,
);

interface LeftContainerProps {
  $rowLabelWidth?: string;
}
export const LeftContainer = styled.div<LeftContainerProps>(
  ({ $rowLabelWidth }) => `  
  width: ${$rowLabelWidth || DEFAULT_ROW_LABEL_WIDTH};
  min-width: ${$rowLabelWidth || DEFAULT_ROW_LABEL_WIDTH};
`,
);

interface RightContainerProps {
  $scrollWidth?: string;
  $scrollColor?: string;
  $scrollBgColor?: string;
}
export const RightContainer = styled.div<RightContainerProps>(
  ({ $scrollWidth, $scrollColor, $scrollBgColor }) => `
  width: auto;
  flex-grow: 1;
  overflow-x: auto;
  height: fit-content;
  padding-bottom: 5px;
  
  &::-webkit-scrollbar {
    width: ${$scrollWidth || DEFAULT_SCROLL_WIDTH};  /* WIDTH, HEIGHT */
    height: ${$scrollWidth || DEFAULT_SCROLL_WIDTH};
  }
  &::-webkit-scrollbar-thumb {
    height: 30%; /* LENGTH */
    background: ${$scrollColor || DEFAULT_SCROLL_COLOR}; /* COLOR */
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background: ${$scrollBgColor || DEFAULT_SCROLL_BG_COLOR};  /* BG COLOR */
  }
`,
);

interface EmptySlotProps {
  $height?: string;
}
export const EmptySlot = styled.li<EmptySlotProps>(
  ({ $height }) => `  
  display: flex;
  align-items: center;
  justify-content: center;
  
  width: 100%;
  height: ${$height || DEFAULT_COLUMN_LABELS_HEIGHT};
`,
);
