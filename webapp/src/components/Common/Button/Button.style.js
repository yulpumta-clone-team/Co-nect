import styled, { css } from 'styled-components/macro';

export const Container = styled.button`
  ${({ theme: { mixin } }) => mixin.flexCenter({})}
  padding: 5px 20px;
  gap: 10px;

  width: 92px;
  height: 28px;
  border-radius: 50px;

  // theme 적용
  & {
    ${({ mytheme }) => mytheme}
  }
  && {
    ${({ customStyle }) => customStyle}
  }
  &:disabled {
    cursor: default;
    opacity: 0.5;
    background-color: ${({ theme: { colors } }) => colors.greyScale.nonActive};
    color: ${({ theme: { colors } }) => colors.greyScale.normal};
  }
`;

export const themes = {
  primary: css`
    background-color: ${({ theme: { colors } }) => colors.primary.normal};
    color: ${({ theme: { colors } }) => colors.greyScale.white};

    &:hover {
      background-color: ${({ theme: { colors } }) => colors.primary.light};
      color: ${({ theme: { colors } }) => colors.greyScale.white};
    }
  `,
  secondary: css`
    background-color: ${({ theme: { colors } }) => colors.secondary.normal};
    color: ${({ theme: { colors } }) => colors.greyScale.white};

    &:hover {
      background-color: ${({ theme: { colors } }) => colors.secondary.light};
      color: ${({ theme: { colors } }) => colors.greyScale.white};
    }
  `,
  important: css`
    background-color: ${({ theme: { colors } }) => colors.important.normal};
    color: ${({ theme: { colors } }) => colors.greyScale.white};

    &:hover {
      background-color: ${({ theme: { colors } }) => colors.important.light};
      color: ${({ theme: { colors } }) => colors.greyScale.white};
    }
  `,
  gray: css`
    background-color: ${({ theme: { colors } }) => colors.greyScale.nonActive};
    color: ${({ theme: { colors } }) => colors.greyScale.normal};

    &:hover {
      background-color: ${({ theme: { colors } }) => colors.greyScale.hover};
      color: ${({ theme: { colors } }) => colors.greyScale.normal};
    }
    &:active {
      background-color: ${({ theme: { colors } }) => colors.greyScale.pressed};
      color: ${({ theme: { colors } }) => colors.greyScale.normal};
    }
  `,
  none: css``,
};
