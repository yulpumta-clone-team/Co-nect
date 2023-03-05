import styled, { css } from 'styled-components/macro';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  ${({ theme: { mixin } }) => mixin.flexCenter({})}
  gap: 24px;
  h1 {
    ${({ theme: { fonts } }) => fonts.korean.title}
  }
  h3 {
    ${({ theme: { fonts } }) => fonts.korean.emphasis}
  }
`;

export const Button = css`
  width: 120px;
  height: 35px;
`;
