import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Dropdown from 'components/Common/Dropdown';
import { ROUTE } from 'constant/route.constant';
import useAuthService from 'hooks/useAuthService';
import Button from 'components/Common/Button';
import Image from 'components/Common/Image';
import { loggedUserType } from 'types/user.type';
import Divider from 'components/Common/Divider';
import CogEightToothSvg from 'assets/icons/CogEightToothSvg';
import * as S from './GlobalNavigation.style';

UserInfoDropdown.propTypes = {
  isDropdownOpen: PropTypes.bool.isRequired,
  shouldCloseDropdown: PropTypes.func.isRequired,
  closeDropdown: PropTypes.func.isRequired,
  userInfo: loggedUserType.isRequired,
};
export default function UserInfoDropdown({
  isDropdownOpen,
  shouldCloseDropdown,
  closeDropdown,
  userInfo,
}) {
  const navigate = useNavigate();
  const { handleDeleteUserInfo } = useAuthService();
  const onClickLogout = async () => {
    handleDeleteUserInfo();
  };
  const onClickLinkLi = (link) => {
    navigate(link);
    closeDropdown();
  };
  const { nickname, profileImg } = userInfo;
  return (
    <Dropdown
      isDropdownOpen={isDropdownOpen}
      shouldCloseDropdown={shouldCloseDropdown}
      closeDropdown={closeDropdown}
      customStyle={S.UserInfoDropdown}
    >
      <ul>
        <S.Edit onClick={() => onClickLinkLi(ROUTE.PROFILE)}>
          <CogEightToothSvg />
        </S.Edit>
        <Image src={profileImg} alt="dropdown-profile" customStyle={S.ProfileImg} />
        <span>{nickname}</span>
        <br />
        <Divider />
        <S.Link onClick={() => onClickLinkLi(ROUTE.MY_LIST)}>좋아요 누른 글 목록</S.Link>
        <Divider />
        <S.Link onClick={() => onClickLinkLi(ROUTE.MY_POST)}>내가 작성한 글 목록</S.Link>
        <Divider />
        <br />
        <Button theme="gray" customStyle={S.LogoutButton} onClick={onClickLogout}>
          로그아웃
        </Button>
      </ul>
    </Dropdown>
  );
}
