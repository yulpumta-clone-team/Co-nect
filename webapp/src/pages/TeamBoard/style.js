import styled from 'styled-components';

export const BoardWrapper = styled.div`
  width: 720px;
  height: 100vh;
  margin: 0 auto;
  border: 1px solid black;
`;

export const Cards = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
  width: 100%;
`;
