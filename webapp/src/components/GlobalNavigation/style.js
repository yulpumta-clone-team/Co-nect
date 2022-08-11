import styled, { css } from 'styled-components';

export const Container = styled.nav`
  width: 100%;
  height: 100px;
  background-color: #036eff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
`;

export const BoardList = styled.ul`
  position: relative;
  display: flex;
  flex-direction: ${(props) => (props.IsflexDirectionColumn ? 'column' : 'row')};
  width: 50%;
  height: 100%;
  justify-content: space-around;
  align-items: center;
`;

export const LinkList = styled.ul`
  position: relative;
  display: flex;
  flex-direction: ${(props) => (props.IsflexDirectionColumn ? 'column' : 'row')};
  width: 50%;
  height: 100%;
  justify-content: space-around;
  align-items: center;
`;

export const AssignList = styled.ul`
  position: relative;
  display: flex;
  flex-direction: ${(props) => (props.IsflexDirectionColumn ? 'column' : 'row')};
  justify-content: flex-end;
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
};
