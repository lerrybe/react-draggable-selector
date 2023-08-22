import styled from '@emotion/styled';

interface ContainerProps {
  $colGap: number;
  $marginBottom: number;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  width: fit-content;
  justify-content: center;
  column-gap: ${({ $colGap }) => $colGap}px;
  margin-bottom: ${({ $marginBottom }) => $marginBottom}px;
`;

interface LabelProps {
  $width: number;
}

export const Label = styled.label<LabelProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ $width }) => $width}px;
  height: 24px;

  color: #8c8d94;
  font-size: 13px;
  font-weight: 500;
  font-family: 'Poppins', sans-serif;
`;
