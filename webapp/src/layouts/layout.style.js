import styled from 'styled-components/macro';

export const AppContainer = styled.div`
  width: 100vw;
`;

export const Header = styled.header`
  width: 100%;
`;

export const Main = styled.main`
  max-width: 1700px;
  margin: 0 auto;
  padding-top: 30px;
  display: flex;
  justify-content: center;
`;

export const Full = styled.main`
  max-width: 1700px;
  height: 100vh;
  margin: 0 auto;
  ${({ theme: { mixin } }) => mixin.flexCenter({})}
`;
