import styled from 'styled-components';

export const AppContainer = styled.div`
  width: 100vw;
`;

export const Main = styled.main`
  width: 100%;
  height: 100vh;
  padding-top: 100px;
  ${({ theme: { mixin } }) => mixin.flexCenter({})}
`;
