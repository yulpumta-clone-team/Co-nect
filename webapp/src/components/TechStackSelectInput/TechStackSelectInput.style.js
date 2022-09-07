/* eslint-disable no-use-before-define */
/* eslint-disable consistent-return */
import styled, { css } from 'styled-components';
import { ReactComponent as UpAngleIcon } from 'assets/icons/up-angle.svg';
import { ReactComponent as DownAngleIcon } from 'assets/icons/down-angle.svg';
import { ReactComponent as CloseNormalIcon } from 'assets/icons/close-normal.svg';
import Divider from 'components/Common/Divider';

export const Container = styled.div`
  box-sizing: border-box;
  position: relative;
  width: 100%;
  max-width: 700px;
  height: 100%;
  ${({ theme: { mixin } }) => mixin.flexCenter({})};
  background-color: ${({ theme: { colors } }) => colors.greyScale.white};
  ${({ customStyle }) => customStyle}
`;

export const ValueViewer = styled.div`
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
        ${PlaceHolder} {
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

export const SelectedStacks = styled.div`
  width: 95%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;
`;

export const SingleStack = styled.div`
  ${({ theme: { mixin } }) => mixin.flexCenter({ direction: 'row' })};
  padding: 2px 0 2px 6px;
  background-color: ${({ theme: { colors } }) => colors.secondary.shadow};
  &:hover {
    background-color: ${({ theme: { colors } }) => colors.secondary.light};
  }
`;

export const Label = styled.label`
  width: 100%;
  align-items: flex-start;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.primary.normal};
  ${({ theme: { fonts } }) => fonts.korean.emphasis};
  font-weight: 700;
`;

export const PlaceHolder = styled.label`
  color: ${({ theme: { colors } }) => colors.greyScale.placeHolder};
`;

export const Select = styled.div`
  ${({ isDropdownOpen }) => {
    if (isDropdownOpen) {
      return css`
        display: block;
      `;
    }
    return css`
      display: none;
    `;
  }}

  ${({ showSelectedOption }) => {
    if (showSelectedOption) {
      return css`
        position: absolute;
        top: 105%;
      `;
    }
    return css`
      position: relative;
    `;
  }};

  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid ${({ theme: { colors } }) => colors.primary.normal};
  border-radius: 5px;
  padding: 0 57px;
  z-index: ${({ theme: { zIndex } }) => zIndex.modalContent};
`;

export const OptionCategory = styled.div`
  padding-top: 24px;
  &:last-child {
    padding-bottom: 24px;
  }
`;

export const OptionCategoryName = styled.span`
  ${({ theme: { fonts } }) => fonts.english.default};
  color: ${({ theme: { colors } }) => colors.greyScale.placeHolder};
`;

export const CategoryDivider = css`
  margin: 8px 0 24px 0;
`;

export const Options = styled.ul`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;

export const Option = styled.li`
  cursor: pointer;
  width: 80px;
  height: 80px;
  ${({ theme: { mixin } }) => mixin.flexCenter({})};
  > img {
    object-fit: scale-down;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: ${({ isSelected, theme: { colors } }) =>
      isSelected && `3px solid ${colors.primary.normal}`};
    &:hover {
      border: 3px solid ${({ theme: { colors } }) => colors.primary.normal};
    }
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

export const ButtonDivider = styled(Divider)`
  height: 24px;
`;

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
  margin: 1rem 0;
  align-self: flex-start;
  padding-left: 1rem;
  color: ${({ theme }) => theme.colors.important.normal};
`;
