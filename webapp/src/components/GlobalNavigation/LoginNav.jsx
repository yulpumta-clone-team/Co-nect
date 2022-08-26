import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTE } from 'constant/route.constant';
import useDropdown from 'hooks/useDropdown';
import { loggedUserType } from 'types/user.type';
import Logo from 'assets/icons/nav-logo.svg';
import Button from 'components/Common/Button';
import UserInfoDropdown from './UserInfoDropdown';
import * as S from './style';

// userInfo {id, profileImg, nickname}
LoginNav.propTypes = {
  userInfo: loggedUserType.isRequired,
};

export default function LoginNav({ userInfo }) {
  const { parent, isDropdownOpen, shouldCloseDropdown, openDropdown, closeDropdown } =
    useDropdown();
  const { nickname, profileImg } = userInfo;

  return (
    <S.Container>
      <S.TopContainer />
      <S.BoardList>
        <S.Logo>
          <img src={Logo} alt="conect-logo" />
        </S.Logo>
        <S.LinkList>
          <S.Hover>
            <Link to={ROUTE.HOME}>Home</Link>
          </S.Hover>
          <S.Hover>
            <Link to={ROUTE.USER}>Single</Link>
          </S.Hover>
          <S.Hover>
            <Link to={ROUTE.TEAM}>Team</Link>
          </S.Hover>
        </S.LinkList>
        <S.AssignList isLogin>
          <Button theme="primary" customStyle={S.AssignListButton}>
            <Link to={ROUTE.NEW_POST}>새글쓰기</Link>
          </Button>
          <S.Alarm />
          <img src={profileImg} alt="profile" ref={parent} onClick={openDropdown} />
          <S.UserName ref={parent} onClick={openDropdown}>
            <span>{nickname}</span>
          </S.UserName>
          <UserInfoDropdown
            isDropdownOpen={isDropdownOpen}
            shouldCloseDropdown={shouldCloseDropdown}
            closeDropdown={closeDropdown}
          />
        </S.AssignList>
      </S.BoardList>
    </S.Container>
  );
}
