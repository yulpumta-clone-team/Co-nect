import styled from 'styled-components/macro';

export const RowContainer = styled.div`
  height: 2px;
  width: 100%;
  background-color: ${({ theme: { colors } }) => colors.greyScale.nonActive};
  height: ${({ height }) => `${height}`};
  width: ${({ width }) => `${width}`};
  margin-top: ${({ marginTop }) => `${marginTop}`};
  margin-bottom: ${({ marginBottom }) => `${marginBottom}`};
  && {
    ${({ customStyle }) => customStyle}
  }
`;

export const ColContainer = styled.div`
  height: 100%;
  width: 2px;
  background-color: ${({ theme: { colors } }) => colors.greyScale.nonActive};
  height: ${({ height }) => `${height}`};
  width: ${({ width }) => `${width}`};
  margin-top: ${({ marginTop }) => `${marginTop}`};
  margin-bottom: ${({ marginBottom }) => `${marginBottom}`};
  && {
    ${({ customStyle }) => customStyle}
  }
`;
