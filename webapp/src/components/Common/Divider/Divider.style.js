import styled from 'styled-components';

export const Container = styled.div`
  height: 2px;
  width: 100%;
  background: ${({ theme: { colors } }) => colors.greyScale.nonActive};
  height: ${({ height }) => `${height}px`};
  width: ${({ width }) => `${width}px`};
  margin-top: ${({ marginTop }) => `${marginTop}px`};
  margin-bottom: ${({ marginBottom }) => `${marginBottom}px`};
`;
