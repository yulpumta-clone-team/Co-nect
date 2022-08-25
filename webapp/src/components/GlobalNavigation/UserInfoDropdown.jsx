import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Dropdown from 'components/Common/Dropdown';
import { deleteUserInfo } from 'service/auth';
import { ROUTE } from 'constant/route.constant';
import * as S from './style';

UserInfoDropdown.propTypes = {
  isDropdownOpen: PropTypes.bool.isRequired,
  shouldCloseDropdown: PropTypes.func.isRequired,
  closeDropdown: PropTypes.func.isRequired,
};
export default function UserInfoDropdown({ isDropdownOpen, shouldCloseDropdown, closeDropdown }) {
  const navigate = useNavigate();
  // api error
  const [apiError, setApiError] = useState({ isError: false, msg: '' });
  const onClickLogout = async () => {
    deleteUserInfo();
    navigate('/');
    window.location.reload();
  };
  const onClickLinkLi = (link) => {
    navigate(link);
    closeDropdown();
  };
  return (
    <Dropdown
      isDropdownOpen={isDropdownOpen}
      shouldCloseDropdown={shouldCloseDropdown}
      closeDropdown={closeDropdown}
      customStyle={S.UserInfoDropdown}
    >
      <ul>
        <S.Link onClick={() => onClickLinkLi(ROUTE.MY_POST)}>내 작성글</S.Link>
        <S.Link onClick={() => onClickLinkLi(ROUTE.MY_LIST)}>내 관심글</S.Link>
        <S.Link onClick={() => onClickLinkLi(ROUTE.PROFILE)}>프로필 설정</S.Link>
        <S.Link onClick={onClickLogout}>로그아웃</S.Link>
      </ul>
    </Dropdown>
  );
}
