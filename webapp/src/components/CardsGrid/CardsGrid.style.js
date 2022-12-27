import styled, { css } from 'styled-components/macro';

export const Cards = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 40px 20px;
  width: 100%;
  height: 100%;
`;

export const Empty = styled.div`
  cursor: pointer;
  width: 100%;
  height: 100%;
  padding-top: 150px;
  ${({ theme: { mixin } }) => mixin.flexCenter({})}
  gap: 12px;
  > h3 {
    ${({ theme: { fonts } }) => fonts.korean.subTitle};
  }
`;

export const Button = css`
  width: 300px;
  height: 50px;
`;
