import styled from 'styled-components/macro';

export const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  background-color: ${({ theme: { colors } }) => colors.greyScale.white};
  ${({ customStyle }) => customStyle}
`;

export const Label = styled.label``;

export const TextArea = styled.textarea`
  box-sizing: border-box;
  background-color: ${({ theme: { colors } }) => colors.greyScale.white};
  border: 1px solid ${({ theme: { colors } }) => colors.greyScale.border};
  border-radius: 3px;

  width: 100%;
  min-height: 8rem;
  resize: vertical;
  padding: 0.6rem 1.6rem;
  ${({ theme: { mixin, colors, fonts } }) =>
    mixin.handlePlaceHolderColor({ color: colors.greyScale.pressed, fonts: fonts.korean.default })};
`;
