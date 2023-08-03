import styled from 'styled-components';

interface ContainerProps {}

export const Container = styled.div<ContainerProps>(
  ({}) => `  
  display: flex;
  overflow: auto;
  
  // 스크롤 색상

  // 전체 넓이와 높이 컨트롤
  // props: width, height, maxWidth, maxHeight
  width: 100%;
  height: 500px;
`,
);

interface LeftContainerProps {}

export const LeftContainer = styled.div<LeftContainerProps>(
  ({}) => `  
  // 전체 width 제어, fixedTimeLabelWidth
  width: 80px;
  min-width: 80px;
`,
);

interface RightContainerProps {}

export const RightContainer = styled.div<RightContainerProps>(
  ({}) => `  
  // 전체 width 제어
  width: auto;
  flex-grow: 1;
`,
);

interface EmptySlotProps {
  height?: number;
}

export const EmptySlot = styled.li<EmptySlotProps>(
  ({ height }) => `  
  width: 100%;
  height: ${height || 30}px;
  
  display: flex;
  align-items: center;
  justify-content: center;
`,
);
