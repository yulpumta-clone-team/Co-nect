/* eslint-disable no-use-before-define */
/* eslint-disable consistent-return */
import styled, { css } from 'styled-components';
import { ReactComponent as UpAngleIcon } from 'assets/icons/up-angle.svg';
import { ReactComponent as DownAngleIcon } from 'assets/icons/down-angle.svg';
import { ReactComponent as CloseNormalIcon } from 'assets/icons/close-normal.svg';
import Divider from '../Divider';

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
  border: 1px solid ${({ theme: { colors } }) => colors.greyScale.border};
  border-radius: 3px;
  padding: 6px 16px;

  ${({ isDropdownOpen }) => {
    if (isDropdownOpen) {
      return css`
        border: 1px solid ${({ theme: { colors } }) => colors.primary.normal};
        ${UpAngle}, ${DownAngle}, ${ClearableButton} {
          & path {
            fill: ${({ theme: { colors } }) => colors.primary.normal};
            stroke: ${({ theme: { colors } }) => colors.primary.normal};
          }
        }
        ${ButtonDivider} {
          background-color: ${({ theme: { colors } }) => colors.primary.normal};
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
        ${UpAngle}, ${DownAngle}, ${ClearableButton} {
          & path {
            fill: ${({ theme: { colors } }) => colors.important.normal};
            stroke: ${({ theme: { colors } }) => colors.important.normal};
          }
        }
        ${ButtonDivider} {
          background-color: ${({ theme: { colors } }) => colors.important.normal};
        }
      `;
    }
  }}
`;

export const DisplayValues = styled.div`
  width: 95%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  flex: 1 1 0%;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;
`;

export const DisplaySingleValue = styled.div`
  ${({ theme: { mixin } }) => mixin.flexCenter({ direction: 'row' })};
  padding: 2px 0 2px 6px;
  background-color: ${({ theme: { colors } }) => colors.secondary.shadow};
  &:hover {
    background-color: ${({ theme: { colors } }) => colors.secondary.light};
  }
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
  background-color: ${({ theme: { colors } }) => colors.greyScale.white};
  border-radius: 5px;
  ${({ theme: { mixin } }) => mixin.flexCenter({})};
  &:hover {
    background-color: ${({ theme: { colors } }) => colors.primary.shadow};
  }
`;

export const ButtonContainer = styled.div`
  height: 100%;
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

export const ButtonDivider = styled(Divider)``;

const CommonButtonStyle = css`
  cursor: pointer;
`;

export const ClearableButton = styled.button``;

export const UpAngle = styled(UpAngleIcon)`
  ${CommonButtonStyle}
`;

export const DownAngle = styled(DownAngleIcon)`
  ${CommonButtonStyle}
`;

export const CloseNormal = styled(CloseNormalIcon)`
  ${CommonButtonStyle}
`;

export const Error = styled.span`
  position: absolute;
  top: 50px;
  padding-left: 6px;
  color: ${({ theme }) => theme.colors.important.normal};
`;
