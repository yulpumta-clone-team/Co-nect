import styled, { css } from 'styled-components';

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
  height: 100px;
  background-color: ${({ theme: { colors } }) => colors.greyScale.white};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
`;

//3개의 컨테이너를 담는 전체 컨테이너
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
  width: 20%;
  height: 100%;
  justify-content: space-around;
  align-items: center;

  ${({ theme: { fonts } }) => fonts.english.emphasis};
`;

export const AssignList = styled.ul`
  position: relative;
  display: flex;
  width: 10%;
  height: 100%;
  align-items: center;
  justify-content: space-between;

  ${({ theme: { fonts } }) => fonts.korean.emphasis};

  > img {
    border-radius: 70%;
    overflow: hidden;
    width: 11.2%;
    height: 35px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
    cursor: pointer;
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
