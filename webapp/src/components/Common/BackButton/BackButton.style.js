import styled from 'styled-components/macro';

export const Container = styled.button`
  position: absolute;
  left: ${({ left }) => left || '40px'};
  top: ${({ top }) => top || '40px'};
  && {
    ${({ customStyle }) => customStyle}
  }
  > svg {
    width: 30px;
    height: 30px;
    & path {
      fill: ${({ theme: { colors } }) => colors.primary.normal};
      stroke: ${({ theme: { colors } }) => colors.primary.normal};
    }
  }
`;
