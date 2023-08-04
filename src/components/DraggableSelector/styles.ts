import styled from 'styled-components';
import {
  DEFAULT_WIDTH,
  DEFAULT_HEIGHT,
  DEFAULT_SCROLL_COLOR,
  DEFAULT_SCROLL_WIDTH,
  DEFAULT_ROW_LABEL_WIDTH,
  DEFAULT_SCROLL_BG_COLOR,
  DEFAULT_COLUMN_LABELS_HEIGHT,
} from '../../constant/options';

interface ContainerProps {
  $width?: string;
  $height?: string;
  $maxWidth?: string;
  $maxHeight?: string;
  $scrollWidth?: string;
  $scrollColor?: string;
  $scrollBgColor?: string;
}
export const Container = styled.div<ContainerProps>(
  ({
    $width,
    $height,
    $maxWidth,
    $maxHeight,
    $scrollWidth,
    $scrollColor,
    $scrollBgColor,
  }) => `  
  display: flex;
  overflow: auto;

  width: ${$width || DEFAULT_WIDTH};
  height: ${$height || DEFAULT_HEIGHT};
  max-width: ${$maxWidth || DEFAULT_WIDTH};
  max-height: ${$maxHeight || DEFAULT_HEIGHT};
  
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

interface RightContainerProps {}
export const RightContainer = styled.div<RightContainerProps>(
  () => `
  width: auto;
  flex-grow: 1;
`,
);

interface EmptySlotProps {
  height?: string;
}
export const EmptySlot = styled.li<EmptySlotProps>(
  ({ height }) => `  
  width: 100%;
  height: ${height || DEFAULT_COLUMN_LABELS_HEIGHT};
  
  display: flex;
  align-items: center;
  justify-content: center;
`,
);
