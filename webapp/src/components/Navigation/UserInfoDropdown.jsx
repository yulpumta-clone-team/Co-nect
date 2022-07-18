import React from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import Dropdown from 'components/Common/Dropdown';
import { deleteUserInfo } from 'service/auth';
import { MY_POST, PROFILE, MY_LIST } from 'constant/route';

UserInfoDropdown.propTypes = {
  isDropdownOpen: PropTypes.bool.isRequired,
  shouldCloseDropdown: PropTypes.func.isRequired,
  closeDropdown: PropTypes.func.isRequired,
};

export default function UserInfoDropdown({ isDropdownOpen, shouldCloseDropdown, closeDropdown }) {
  const navigate = useNavigate();
  const triggerLogOut = () => {
    deleteUserInfo();
    navigate('/');
    window.location.reload();
  };
  return (
    <Dropdown
      style={{ right: 0, top: 80 }}
      isDropdownOpen={isDropdownOpen}
      shouldCloseDropdown={shouldCloseDropdown}
      closeDropdown={closeDropdown}
    >
      <ul>
        <li>
          <Link to={MY_POST}>내 작성글</Link>
        </li>
        <li>
          <Link to={MY_LIST}>내 관심글</Link>
        </li>
        <li>
          <Link to={PROFILE}>프로필 설정</Link>
        </li>
        <li>
          <button onClick={triggerLogOut}>로그아웃</button>
        </li>
      </ul>
    </Dropdown>
  );
}
