import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { HOME, MY_POST, NEW_POST, PROFILE, TEAM, MY_LIST, USER } from 'constant/route';
import useDropdown from 'hooks/useDropdown';
import UserInfoDropdown from './UserInfoDropdown';
import * as S from './style';

LoginNav.propTypes = {
  userInfo: PropTypes.shape({
    userId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    profileImg: PropTypes.string.isRequired,
  }).isRequired,
};

export default function LoginNav({ userInfo }) {
  const [parent, isDropdownOpen, shouldCloseDropdown, openDropdown, closeDropdown] = useDropdown();
  const { name, profileImg } = userInfo;

  return (
    <S.LinkList>
      <li>
        <Link to={HOME}>Main</Link>
      </li>
      <li>
        <Link to={USER}>User Board</Link>
      </li>
      <li>
        <Link to={TEAM}>Team Board</Link>
      </li>
      <li>
        <Link to={NEW_POST}>New Post</Link>
      </li>
      <li ref={parent} onClick={openDropdown} style={{ position: 'relative' }}>
        <img style={{ width: '30px' }} src={profileImg} alt="profile" />
        <span>{name}</span>
        <UserInfoDropdown
          isDropdownOpen={isDropdownOpen}
          shouldCloseDropdown={shouldCloseDropdown}
          closeDropdown={closeDropdown}
        />
      </li>
    </S.LinkList>
  );
}
