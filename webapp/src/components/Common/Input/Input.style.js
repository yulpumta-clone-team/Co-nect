/* eslint-disable consistent-return */
import styled, { css } from 'styled-components';

export const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  background: ${({ theme: { colors } }) => colors.greyScale.white};
  ${({ customStyle }) => customStyle}
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 6px 16px;
  margin-bottom: 4px;
  border: 1px solid ${({ theme: { colors } }) => colors.greyScale.border};
  border-radius: 3px;
  ${({ isError }) => {
    if (isError) {
      return css`
        border: 1px solid ${({ theme: { colors } }) => colors.important.normal};
        ${Input} {
          color: ${({ theme: { colors } }) => colors.important.normal};
          ${({ theme: { mixin, colors } }) =>
            mixin.handlePlaceHolderColor(colors.important.normal)};
        }
      `;
    }
  }}
`;

export const Label = styled.label``;

export const Input = styled.input`
  ${({ theme: { mixin, colors, fonts } }) =>
    mixin.handlePlaceHolderColor({ color: colors.greyScale.pressed, fonts: fonts.korean.default })};
`;

export const Error = styled.span`
  padding-left: 6px;
  color: ${({ theme }) => theme.colors.important.normal};
`;
