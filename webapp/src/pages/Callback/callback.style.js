import styled, { css } from 'styled-components/macro';

export const Container = styled.div`
  max-width: 1180px;
  height: 100vh;
  ${({ theme: { mixin } }) => mixin.flexCenter({})}
  gap: 24px;
`;

export const Button = css`
  width: 120px;
  height: 35px;
`;
