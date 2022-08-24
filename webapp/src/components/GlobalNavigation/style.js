import styled, { css } from 'styled-components';
import { ReactComponent as alarm } from 'assets/icons/alarm.svg';

// 상단 파란색 상자
export const TopContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 10%;
  background-color: ${({ theme: { colors } }) => colors.primary.normal};
`;

// nav bar 전체 Container
export const Container = styled.nav`
  display: flex;
  flex-direction: column;
  align-content: space-around;
  justify-content: space-around;
  width: 100%;
  height: 95%;
  background-color: ${({ theme: { colors } }) => colors.greyScale.white};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
`;

// 3개의 컨테이너를 담는 전체 컨테이너
export const BoardList = styled.ul`
  display: flex;
  flex-direction: center;
  align-items: center;
  width: 100%;
  height: 70%;
  justify-content: space-between;
  padding: 0 2%;
`;

// 3개의 div 컨테이너.
export const Logo = styled.div`
  display: flex;
  width: 5%;
  height: 50%;
`;

export const LinkList = styled.ul`
  display: flex;
  flex-direction: ${(props) => (props.IsflexDirectionColumn ? 'column' : 'row')};
  width: 350px;
  height: 100%;
  justify-content: space-around;
  align-items: center;

  ${({ theme: { fonts } }) => fonts.english.emphasis};
`;

export const AssignList = styled.ul`
  position: relative;
  display: flex;
  width: ${({ isLogin }) => (isLogin ? '300px' : '210px')};
  height: 100%;
  align-items: center;
  justify-content: space-between;

  ${({ theme: { fonts } }) => fonts.korean.emphasis};

  > img {
    cursor: pointer;
    border-radius: 70%;
    width: 12%;
    height: 35px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  }
`;

// Link List 속성
export const Hover = styled.div`
  &:hover {
    color: ${({ theme: { colors } }) => colors.primary.normal};
  }
`;

export const Link = styled.div`
  cursor: pointer;
  text-decoration: underline;
`;

export const Alarm = styled(alarm)`
  overflow: hidden;
  width: 15px;
  height: 20px;
  cursor: pointer;
`;

// user 이름
export const UserName = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 27%;
  height: 100%;

  > span {
    ${({ theme: { fonts } }) => fonts.english.default};
  }
`;

// dropdown modal
export const UserInfoDropdown = {
  overlayStyle: css`
    position: absolute;
    top: 64px;
    right: -10px;
  `,
  contentStyle: css`
    height: 135px;
    ${({ theme: { fonts } }) => fonts.korean.emphasis};
  `,
};

export const AssignListButton = css`
  width: 99px;
  height: 35px;
`;
