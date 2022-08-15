import React from 'react';
import { Link } from 'react-router-dom';
import { HOME, NEW_POST, TEAM, USER } from 'constant/route';
import useDropdown from 'hooks/useDropdown';
import { loggedUserType } from 'types/user.type';
import UserInfoDropdown from './UserInfoDropdown';
import logo from 'assets/icons/logo.svg';
import alarm from 'assets/icons/alarm.svg';
import * as S from './style';

LoginNav.propTypes = {
  userInfo: loggedUserType.isRequired,
};

export default function LoginNav({ userInfo }) {
  const [parent, isDropdownOpen, shouldCloseDropdown, openDropdown, closeDropdown] = useDropdown();
  const { name, profileImg } = userInfo;

  return (
    <S.BoardList>
      <S.Logo>
        <img src={logo} alt="Logo" />
        <S.Text style={{ color: '#036EFF' }}>Co-nect</S.Text>
      </S.Logo>
      <S.LinkList>
        <S.Text>
          <Link to={HOME}>Main</Link>
        </S.Text>
        <S.Text>
          <Link to={USER}>User Board</Link>
        </S.Text>
        <S.Text>
          <Link to={TEAM}>Team Board</Link>
        </S.Text>
      </S.LinkList>
      <S.AssignList>
        <S.AssignButton style={{ background: '#036EFF' }}>
          <S.Text style={{ color: '#FFFFFF' }}>
            <Link to={NEW_POST}>새글쓰기</Link>
          </S.Text>
        </S.AssignButton>
        <img src={alarm} alt="Alarm" />
        <li ref={parent} onClick={openDropdown} style={{ position: 'relative' }}>
          <img style={{ width: '30px' }} src={profileImg} alt="profile" />
          <span>{name}</span>
          <UserInfoDropdown
            isDropdownOpen={isDropdownOpen}
            shouldCloseDropdown={shouldCloseDropdown}
            closeDropdown={closeDropdown}
          />
        </li>
      </S.AssignList>
    </S.BoardList>
  );
}
