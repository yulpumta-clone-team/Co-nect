import styled, { css } from 'styled-components/macro';

// nav bar 전체 Container
export const Container = styled.nav`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 70px;
  background-color: ${({ theme: { colors } }) => colors.greyScale.white};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  padding-top: 7px; //상단 파란색 상자 높이
`;

// 상단 파란색 상자
export const TopContainer = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 7px;
  background-color: ${({ theme: { colors } }) => colors.primary.normal};
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
export const Logo = css`
  width: 157px;
  height: 50px;
`;

export const LinkList = styled.ul`
  display: flex;
  width: 20%;
  height: 100%;
  justify-content: center;
  gap: 12px;
  align-items: center;

  ${({ theme: { fonts } }) => fonts.english.title};
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

export const Alarm = styled.button`
  > svg {
    width: 2.4rem;
    height: 2.4rem;
  }
`;

// user 이름
export const UserName = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 28%;
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
