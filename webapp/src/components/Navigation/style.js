import styled from 'styled-components';

export const NavWrapper = styled.nav`
  width: 100%;
  height: 80px;
  background-color: wheat;
`;

export const Ul = styled.ul`
  position: relative;
  display: flex;
  flex-direction: ${(props) => (props.IsflexDirectionColumn ? 'column' : 'row')};
  width: 100%;
  height: 100%;
  justify-content: space-around;
  align-items: center;
`;

export const Li = styled.li``;
