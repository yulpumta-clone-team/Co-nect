/* eslint-disable import/prefer-default-export */
import styled from 'styled-components/macro';

export const Cards = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 40px 20px;
  width: 100%;
  height: 100%;
`;
