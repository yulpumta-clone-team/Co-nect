import styled, { css } from 'styled-components';

export const Container = styled.div`
  height: 2px;
  width: 100%;
  background: ${({ theme: { colors } }) => colors.greyScale.nonActive};
  height: ${({ height }) => `${height}px`};
  width: ${({ width }) => `${width}px`};
`;
