import React from 'react';
import Image from 'components/Common/Image';
import Button from 'components/Common/Button';
import { Link } from 'react-router-dom';
import { ROUTE } from 'constant/route.constant';
import BellSvg from 'assets/icons/BellSvg';
import { loggedUserType } from 'types/user.type';
import useDropdown from 'hooks/useDropdown';
import UserInfoDropdown from './UserInfoDropdown';
import * as S from './GlobalNavigation.style';

// userInfo {id, profileImg, nickname}
AssignList.propTypes = {
  userInfo: loggedUserType.isRequired,
};

export default function AssignList({ userInfo }) {
  const { parent, isDropdownOpen, shouldCloseDropdown, openDropdown, closeDropdown } =
    useDropdown();
  const { nickname, profileImg } = userInfo;
  return (
    <S.AssignList isLogin>
      <Button theme="primary" customStyle={S.AssignListButton}>
        <Link to={ROUTE.NEW_POST}>새글쓰기</Link>
      </Button>
      <S.Alarm>
        <BellSvg />
      </S.Alarm>
      <Image src={profileImg} alt="profile" ref={parent} onClick={openDropdown} />
      <S.UserName ref={parent} onClick={openDropdown}>
        <span>{nickname}</span>
      </S.UserName>
      <UserInfoDropdown
        isDropdownOpen={isDropdownOpen}
        shouldCloseDropdown={shouldCloseDropdown}
        closeDropdown={closeDropdown}
      />
    </S.AssignList>
  );
}
