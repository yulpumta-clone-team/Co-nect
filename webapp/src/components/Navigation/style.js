import styled, { css } from 'styled-components';

export const Container = styled.nav`
  width: 100%;
  height: 80px;
  background-color: wheat;
`;

export const LinkList = styled.ul`
  position: relative;
  display: flex;
  flex-direction: ${(props) => (props.IsflexDirectionColumn ? 'column' : 'row')};
  width: 100%;
  height: 100%;
  justify-content: space-around;
  align-items: center;
`;

export const Link = styled.li`
  cursor: pointer;
  text-decoration: underline;
`;

export const UserInfoDropdown = {
  overlayStyle: css`
    position: absolute;
    top: 64px;
    right: -10px;
  `,
  contentStyle: css``,
  buttonStyle: css``,
};
