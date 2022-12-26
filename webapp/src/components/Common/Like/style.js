import styled from 'styled-components/macro';

export const Heart = styled.button`
  width: 25px;
  height: 25px;
  > svg {
    & path {
      stroke: ${({ theme: { colors } }) => colors.primary.normal};
      fill: ${({ theme: { colors } }) => colors.primary.normal};
    }
  }
`;
