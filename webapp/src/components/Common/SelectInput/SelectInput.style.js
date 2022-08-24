/* eslint-disable consistent-return */
import styled, { css } from 'styled-components';
import { ReactComponent as UpAngleIcon } from 'assets/icons/up-angle.svg';
import { ReactComponent as DownAngleIcon } from 'assets/icons/down-angle.svg';
import { ReactComponent as CloseNormalIcon } from 'assets/icons/close-normal.svg';

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

  ${({ isDropdownOpen }) => {
    if (isDropdownOpen) {
      return css`
        border: 1px solid ${({ theme: { colors } }) => colors.primary.normal};
        ${UpAngle}, ${DownAngle}, , ${CloseNormal} {
          & path {
            fill: ${({ theme: { colors } }) => colors.primary.normal};
            stroke: ${({ theme: { colors } }) => colors.primary.normal};
          }
        }
      `;
    }
  }}

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

export const DisplayValue = styled.div`
  width: 95%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

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
  ${({ theme: { mixin } }) => mixin.flexCenter({})};
  background-color: ${({ theme: { colors } }) => colors.greyScale.white};
  &:hover {
    background-color: ${({ theme: { colors } }) => colors.primary.shadow};
  }
`;

export const CommonAngle = css``;

export const ButtonContainer = styled.div`
  position: absolute;
  right: 15px;
  height: 75%;
  gap: 8px;
  ${({ theme: { mixin } }) => mixin.flexCenter({ direction: 'row' })};
  & path {
    fill: ${({ theme: { colors } }) => colors.greyScale.placeHolder};
    stroke: ${({ theme: { colors } }) => colors.greyScale.placeHolder};
  }
  & path {
    &:hover {
      fill: ${({ theme: { colors } }) => colors.primary.normal};
      stroke: ${({ theme: { colors } }) => colors.primary.normal};
    }
  }
`;

export const ClearableButton = styled.button``;

export const UpAngle = styled(UpAngleIcon)``;

export const DownAngle = styled(DownAngleIcon)`
  ${CommonAngle}
`;

export const CloseNormal = styled(CloseNormalIcon)`
  ${CommonAngle}
`;

export const Error = styled.span`
  position: absolute;
  top: 50px;
  padding-left: 6px;
  color: ${({ theme }) => theme.colors.important.normal};
`;
