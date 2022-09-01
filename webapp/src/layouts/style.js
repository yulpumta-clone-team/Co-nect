import styled from 'styled-components';

export const AppContainer = styled.div`
  width: 100vw;
`;

export const Header = styled.header`
  width: 100%;
  height: 100px;
  position: absolute;
  > div {
    width: 100vw;
    margin: 0 auto;
  }
`;

export const Main = styled.main`
  max-width: 1180px;
  height: 100vh;
  margin-top: 100px;
  padding-top: 100px;
  ${({ theme: { mixin } }) => mixin.flexCenter({})}
  margin: 0 auto;
`;
