/* eslint-disable consistent-return */
import styled, { css } from 'styled-components/macro';

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: ${({ theme: { colors } }) => colors.greyScale.white};
  ${({ theme: { mixin } }) => mixin.flexCenter({})};
  ${({ customStyle }) => customStyle}
`;

export const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 6px 16px;
  border: 1px solid ${({ theme: { colors } }) => colors.greyScale.border};
  border-radius: 3px;
  ${({ isError }) => {
    if (isError) {
      return css`
        margin-bottom: 12px;
        border: 1px solid ${({ theme: { colors } }) => colors.important.normal};
        ${Input} {
          color: ${({ theme: { colors } }) => colors.important.normal};
          ${({ theme: { mixin, colors } }) =>
            mixin.handlePlaceHolderColor({ color: colors.important.normal })};
        }
      `;
    }
  }}
`;

export const Label = styled.label`
  width: 100%;
  display: block;
  align-items: flex-start;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.primary.normal};
  ${({ theme: { fonts } }) => fonts.korean.emphasis};
  font-weight: 700;
`;

export const Input = styled.input`
  ${({ theme: { mixin, colors, fonts } }) =>
    mixin.handlePlaceHolderColor({ color: colors.greyScale.pressed, fonts: fonts.korean.default })};
`;

export const Error = styled.span`
  align-self: flex-start;
  padding-left: 1rem;
  color: ${({ theme }) => theme.colors.important.normal};
`;
