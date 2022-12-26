/* eslint-disable no-use-before-define */
/* eslint-disable consistent-return */
import styled, { css } from 'styled-components/macro';
import Divider from '../Divider';

export const Container = styled.div`
  box-sizing: border-box;
  position: relative;
  width: 100%;
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
  border: 1px solid ${({ theme: { colors } }) => colors.greyScale.border};
  border-radius: 3px;
  padding: 6px 16px;

  ${({ isDropdownOpen }) => {
    if (isDropdownOpen) {
      return css`
        border: 1px solid ${({ theme: { colors } }) => colors.primary.normal};
        ${ChevronButton}, ${XMarkButton} {
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
        ${ChevronButton}, ${XMarkButton} {
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

export const Select = styled.ul`
  ${({ isDropdownOpen, theme: { mixin } }) => {
    if (isDropdownOpen) {
      return css`
        display: block;
      `;
    }
    return css`
      display: none;
    `;
  }}
  position: absolute;
  top: 105%;
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid ${({ theme: { colors } }) => colors.primary.normal};
  border-radius: 5px;
  z-index: ${({ theme: { zIndex } }) => zIndex.modalContent};
`;

export const Option = styled.li`
  width: 100%;
  height: 50px;
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

export const XMarkButton = styled.button``;

export const ChevronButton = styled.button``;

export const Error = styled.span`
  align-self: flex-start;
  padding-left: 1rem;
  color: ${({ theme }) => theme.colors.important.normal};
`;
