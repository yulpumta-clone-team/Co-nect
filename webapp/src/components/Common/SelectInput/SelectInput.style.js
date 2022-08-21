/* eslint-disable consistent-return */
import styled, { css } from 'styled-components';
import { ReactComponent as UpAngleIcon } from 'assets/icons/up-angle.svg';
import { ReactComponent as DownAngleIcon } from 'assets/icons/down-angle.svg';

export const Container = styled.div`
  box-sizing: border-box;
  position: relative;
  width: 100%;
  height: 40px;
  ${({ theme: { mixin } }) => mixin.flexCenter({})};

  background: ${({ theme: { colors } }) => colors.greyScale.white};
  ${({ customStyle }) => customStyle}
`;

export const PlaceHolder = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  border: 1px solid ${({ theme: { colors } }) => colors.greyScale.border};
  border-radius: 3px;
  padding: 6px 16px;
  ${({ isError }) => {
    if (isError) {
      return css`
        border: 1px solid ${({ theme: { colors } }) => colors.important.normal};
        ${Label} {
          color: ${({ theme: { colors } }) => colors.important.normal};
        }
        ${UpAngle}, ${DownAngle} {
          & path {
            fill: ${({ theme: { colors } }) => colors.important.normal};
            stroke: ${({ theme: { colors } }) => colors.important.normal};
          }
        }
      `;
    }
  }}
`;

export const DisplayValue = styled.span``;

export const Label = styled.label`
  color: ${({ theme: { colors } }) => colors.greyScale.placeHolder};
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
  z-index: ${({ theme: { zIndex } }) => zIndex.modalContent};
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

export const Error = styled.span`
  position: absolute;
  top: 50px;
  padding-left: 6px;
  color: ${({ theme }) => theme.colors.important.normal};
`;
