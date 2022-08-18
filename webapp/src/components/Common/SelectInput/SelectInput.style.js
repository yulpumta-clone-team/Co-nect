import styled, { css } from 'styled-components';
import { ReactComponent as UpAngleIcon } from 'assets/icons/up-angle.svg';
import { ReactComponent as DownAngleIcon } from 'assets/icons/down-angle.svg';

export const Container = styled.div`
  box-sizing: border-box;
  position: relative;
  width: 100%;
  height: 40px;
  ${({ theme: { mixin } }) => mixin.flexCenter({})};
  padding: 6px 16px;
  border: 1px solid ${({ theme: { colors } }) => colors.greyScale.border};
  border-radius: 3px;
  background: ${({ theme: { colors } }) => colors.greyScale.white};
  ${({ customStyle }) => customStyle}
`;

export const Label = styled.label``;

export const PlaceHolder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const Select = styled.ul`
  ${({ isDropdownOpen, theme: { mixin } }) => {
    if (isDropdownOpen) {
      return mixin.flexCenter({});
    }
    return css`
      display: none;
    `;
  }}
  box-sizing: border-box;
  position: absolute;
  top: 42px;
  width: 100%;
  border: 1px solid ${({ theme: { colors } }) => colors.primary.normal};
  border-radius: 5px;
`;

export const Option = styled.li`
  width: 100%;
  height: 29px;
  background-color: ${({ theme: { colors } }) => colors.primary.shadow};
  ${({ theme: { mixin } }) => mixin.flexCenter({})};
`;

export const CloseButton = styled.button``;

export const CommonAngle = css`
  position: absolute;
  right: 15px;
`;

export const UpAngle = styled(UpAngleIcon)`
  ${CommonAngle};
`;

export const DownAngle = styled(DownAngleIcon)`
  ${CommonAngle};
`;
