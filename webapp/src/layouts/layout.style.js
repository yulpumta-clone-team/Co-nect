import styled from 'styled-components/macro';

export const AppContainer = styled.div`
  width: 100vw;
`;

export const Header = styled.header`
  width: 100%;
`;

export const Main = styled.main`
  max-width: 1180px;
  margin: 0 auto;
  padding-top: 30px;
`;

export const Full = styled.main`
  max-width: 1180px;
  height: 100vh;
  margin: 0 auto;
  ${({ theme: { mixin } }) => mixin.flexCenter({})}
`;
