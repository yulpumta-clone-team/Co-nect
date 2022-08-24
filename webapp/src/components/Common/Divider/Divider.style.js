import styled from 'styled-components';

export const RowContainer = styled.div`
  height: 2px;
  width: 100%;
  background: ${({ theme: { colors } }) => colors.greyScale.nonActive};
  height: ${({ height }) => `${height}px`};
  width: ${({ width }) => `${width}px`};
  margin-top: ${({ marginTop }) => `${marginTop}px`};
  margin-bottom: ${({ marginBottom }) => `${marginBottom}px`};
`;

export const ColContainer = styled.div`
  height: 100%;
  width: 2px;
  background: ${({ theme: { colors } }) => colors.greyScale.nonActive};
  height: ${({ height }) => `${height}px`};
  width: ${({ width }) => `${width}px`};
  margin-top: ${({ marginTop }) => `${marginTop}px`};
  margin-bottom: ${({ marginBottom }) => `${marginBottom}px`};
`;
