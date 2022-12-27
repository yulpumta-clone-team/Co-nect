import styled from 'styled-components/macro';

export const AppContainer = styled.div`
  width: 100vw;
`;

export const Header = styled.header`
  width: 100%;
  position: absolute;
  > div {
    width: 100vw;
    margin: 0 auto;
  }
`;

export const Main = styled.main`
  max-width: 1180px;
  padding-top: 70px;
  ${({ theme: { mixin } }) => mixin.flexCenter({})}
  margin: 0 auto;
`;

export const Full = styled.main`
  max-width: 1180px;
  height: 100vh;
  ${({ theme: { mixin } }) => mixin.flexCenter({})}
`;
