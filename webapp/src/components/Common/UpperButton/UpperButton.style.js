import styled from 'styled-components';
import { ReactComponent as UpArrowIcon } from 'assets/icons/up-arrow.svg';

export const Container = styled.button`
  position: fixed;
  bottom: 12px;
  right: 12px;
  border-radius: 50%;
  width: 78px;
  height: 78px;
  background-color: ${({ theme: { colors } }) => colors.primary.normal};
  ${({ theme: { mixin } }) => mixin.flexCenter({})}
  opacity: ${({ isShow }) => (isShow ? '1' : '0')};
  &:hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`;

export const UpArrow = styled(UpArrowIcon)`
  & path {
    fill: ${({ theme: { colors } }) => colors.greyScale.white};
    stroke: ${({ theme: { colors } }) => colors.greyScale.white};
  }
`;
