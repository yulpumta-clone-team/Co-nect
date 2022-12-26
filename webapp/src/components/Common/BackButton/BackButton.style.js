import styled from 'styled-components/macro';

export const Container = styled.button`
  position: absolute;
  left: 1.56%;
  top: 3.33%;

  ${({ theme: { mixin } }) => mixin.flexCenter({})}
  > svg {
    width: 30px;
    height: 30px;
    & path {
      fill: ${({ theme: { colors } }) => colors.primary.normal};
      stroke: ${({ theme: { colors } }) => colors.primary.normal};
    }
  }
`;
