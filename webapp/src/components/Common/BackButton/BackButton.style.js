import styled from 'styled-components';
import { ReactComponent as LeftArrowIcon } from 'assets/icons/left-arrow.svg';

export const Container = styled.button`
  position: absolute;
  left: 1.56%;
  top: 3.33%;

  ${({ theme: { mixin } }) => mixin.flexCenter({})}
`;

export const UpArrow = styled(LeftArrowIcon)`
  width: 30px;
  height: 30px;
  & path {
    fill: ${({ theme: { colors } }) => colors.primary.normal};
    stroke: ${({ theme: { colors } }) => colors.primary.normal};
  }
`;
