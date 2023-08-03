import styled from 'styled-components';

interface ContainerProps {
  $width?: string;
  $height?: string;
  $maxWidth?: string;
  $maxHeight?: string;
  $scrollColor?: string;
  $scrollBgColor?: string;
  $scrollWidth?: string;
}

export const Container = styled.div<ContainerProps>(
  ({
    $width,
    $height,
    $maxWidth,
    $maxHeight,
    $scrollColor,
    $scrollBgColor,
    $scrollWidth,
  }) => `  
  display: flex;
  overflow: auto;
  
  &::-webkit-scrollbar {
    width: ${$scrollWidth || '3px'};  /* WIDTH, HEIGHT */
    height: ${$scrollWidth || '3px'};
  }
  &::-webkit-scrollbar-thumb {
    height: 30%; /* LENGTH */
    background: ${$scrollColor || '#217af4'}; /* COLOR */
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background: ${$scrollBgColor || 'rgba(33, 122, 244, .1)'};  /* BG COLOR */
  }

  width: ${$width || '100%'};
  height: ${$height || '500px'};
  max-width: ${$maxWidth || '100%'};
  max-height: ${$maxHeight || '500px'};
`,
);

interface LeftContainerProps {
  $rowLabelWidth?: string;
}

export const LeftContainer = styled.div<LeftContainerProps>(
  ({ $rowLabelWidth }) => `  
  width: ${$rowLabelWidth || '60px'};
  min-width: ${$rowLabelWidth || '60px'};
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
  height: ${height || '30px'};
  
  display: flex;
  align-items: center;
  justify-content: center;
`,
);
