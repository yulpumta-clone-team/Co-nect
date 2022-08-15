import styled, { css } from 'styled-components';

export const TopContainer = styled.div`
  width: 100%;
  height: 15%;
  background-color: #036eff;
`;

export const Container = styled.nav`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100px;
  background-color: #ffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);

  justify-content: center;
`;

export const Text = styled.div`
  position: relative;
  display: flex;

  font-family: 'Arimo';
  font-style: normal;
  font-weight: 700;
  line-height: 32px;

  align-items: center;
`;

export const BoardList = styled.ul`
  position: relative;
  display: flex;
  flex-direction: center;
  width: 100%;
  height: 100%;
  justify-content: space-around;
  align-items: center;
`;

export const Logo = styled.div`
  display: flex;
  width: 10%;
  height: 35%;
`;

export const LinkList = styled.ul`
  position: relative;
  display: flex;
  flex-direction: ${(props) => (props.IsflexDirectionColumn ? 'column' : 'row')};
  width: 20%;
  height: 100%;
  justify-content: space-around;
  align-items: center;
`;

export const AssignList = styled.ul`
  position: relative;
  display: flex;
  flex-direction: ${(props) => (props.IsflexDirectionColumn ? 'column' : 'row')};
  width: 15%;
  height: 5%;
  justify-content: space-around;
  align-items: center;
`;

export const AssignButton = styled.div`
  position: relative;
  display: flex;
  width: 45%;
  background: #dedede;
  border-radius: 50px;
  justify-content: center;
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
