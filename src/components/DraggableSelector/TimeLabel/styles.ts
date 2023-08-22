import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  min-width: 64px;
  align-items: center;
  flex-direction: column;
`;

interface LabelProps {
  $height: number;
}

export const Label = styled.label<LabelProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  height: ${({ $height }) => $height}px;

  color: #8c8d94;
  font-size: 13px;
  font-weight: 400;
  font-family: 'Poppins', sans-serif;
  border: 1px solid transparent;
`;
