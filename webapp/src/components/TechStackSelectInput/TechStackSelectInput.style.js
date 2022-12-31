/* eslint-disable no-use-before-define */
/* eslint-disable consistent-return */
import styled, { css } from 'styled-components/macro';
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
        ${ChevronButton}, ${XMarkButton}, ${ClearableButton} {
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
        ${ChevronButton}, ${XMarkButton}, ${ClearableButton} {
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
  gap: 10px;
`;

export const SingleStack = styled.div`
  ${({ theme: { mixin } }) => mixin.flexCenter({ direction: 'row' })};
  > img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    /* Color/Primary/900 */
    border: 1px solid #036eff;
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
  ${({ isDropdownOpen, isDropdownType }) => {
    if (isDropdownType) {
      return css`
        display: block;
      `;
    }
    if (isDropdownOpen) {
      return css`
        display: block;
      `;
    }
    return css`
      display: none;
    `;
  }}

  ${({ isDropdownType }) => {
    if (isDropdownType) {
      return css`
        position: relative;
      `;
    }
    return css`
      position: absolute;
      top: 105%;
    `;
  }};

  width: 100%;
  height: 200px;
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid ${({ theme: { colors } }) => colors.primary.normal};
  background-color: ${({ theme: { colors } }) => colors.greyScale.white};
  border-radius: 5px;
  padding: 0 57px;
  padding-top: 24px;
  z-index: ${({ theme: { zIndex } }) => zIndex.modalContent};
`;

export const SpinnerContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
`;

export const OptionCategory = styled.div`
  &:not(:first-child) {
    padding-top: 24px;
  }
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

export const XMarkButton = styled.button``;

export const ChevronButton = styled.button``;

export const ClearableButton = styled.button``;

export const Error = styled.span`
  margin-bottom: 1rem;
  align-self: flex-start;
  padding-left: 1rem;
  color: ${({ theme }) => theme.colors.important.normal};
`;
