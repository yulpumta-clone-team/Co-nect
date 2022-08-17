import styled, { css } from 'styled-components';
import { ReactComponent as CloseLargeIcon } from 'assets/icons/close-large.svg';
import { ReactComponent as LeftAngleIcon } from 'assets/icons/left-angle.svg';
import { ReactComponent as rightAngleIcon } from 'assets/icons/right-angle.svg';

export const Layout = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  z-index: ${({ theme: { zIndex } }) => zIndex.modalLayout};
  background-color: ${({ theme: { colors } }) => colors.greyScale.border};
`;
export const DialogContainer = styled.dialog`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 749px;
  height: 520px;
  z-index: ${({ theme: { zIndex } }) => zIndex.modalLevel};
  background-color: ${({ theme: { colors } }) => colors.greyScale.white};
  border-radius: 20px;
  ${({ theme: { mixin } }) => mixin.flexCenter({})};
`;

export const Content = styled.div`
  z-index: ${({ theme: { zIndex } }) => zIndex.modalContent};
`;

export const CloseButton = css`
  position: absolute;
  width: 30px;
  height: 30px;
  right: 4%;
  top: 5%;
`;

export const CloseLarge = styled(CloseLargeIcon)`
  & path {
    fill: ${({ theme: { colors } }) => colors.greyScale.border};
    stroke: ${({ theme: { colors } }) => colors.greyScale.border};
  }
`;

export const AngleContainer = styled.div`
  ${({ theme: { mixin } }) => mixin.positionCenterY()};
  ${({ theme: { mixin } }) => mixin.flexBox({ direction: 'row', justify: 'space-between' })};
  width: 100%;
  padding: 0 4%;
`;

export const AngleButton = css`
  width: 50px;
  height: 50px;
`;

export const LeftAngle = styled(LeftAngleIcon)`
  & path {
    fill: ${({ theme: { colors } }) => colors.greyScale.black};
    stroke: ${({ theme: { colors } }) => colors.greyScale.black};
  }
`;

export const RightAngle = styled(rightAngleIcon)`
  & path {
    fill: ${({ theme: { colors } }) => colors.greyScale.black};
    stroke: ${({ theme: { colors } }) => colors.greyScale.black};
  }
`;
