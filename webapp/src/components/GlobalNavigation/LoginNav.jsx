import React from 'react';
import { Link } from 'react-router-dom';
import { HOME, NEW_POST, TEAM, USER } from 'constant/route';
import useDropdown from 'hooks/useDropdown';
import { loggedUserType } from 'types/user.type';
import Logo from 'assets/icons/nav-logo.svg';
import Button from 'components/Common/Button';
import UserInfoDropdown from './UserInfoDropdown';
import * as S from './style';

LoginNav.propTypes = {
  userInfo: loggedUserType.isRequired,
};

export default function LoginNav({ userInfo }) {
  const [parent, isDropdownOpen, shouldCloseDropdown, openDropdown, closeDropdown] = useDropdown();
  const { name, profileImg } = userInfo;

  return (
    <S.Container>
      <S.TopContainer />
      <S.BoardList>
        <S.Logo>
          <img src={Logo} alt="conect-logo" />
        </S.Logo>
        <S.LinkList>
          <S.Hover>
            <Link to={HOME}>Home</Link>
          </S.Hover>
          <S.Hover>
            <Link to={USER}>Single</Link>
          </S.Hover>
          <S.Hover>
            <Link to={TEAM}>Team</Link>
          </S.Hover>
        </S.LinkList>
        <S.AssignList isLogin>
          <Button theme="primary" customStyle={{ width: 99, height: 35 }}>
            <Link to={NEW_POST}>새글쓰기</Link>
          </Button>
          <S.Alarm />
          <img src={profileImg} alt="profile" ref={parent} onClick={openDropdown} />
          <S.UserName ref={parent} onClick={openDropdown}>
            <span>{name}</span>
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
