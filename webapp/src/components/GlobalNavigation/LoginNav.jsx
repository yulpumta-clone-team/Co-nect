import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTE } from 'constant/route.constant';
import useDropdown from 'hooks/useDropdown';
import { loggedUserType } from 'types/user.type';
import LogoWithName from 'assets/images/logo-name.png';
import Button from 'components/Common/Button';
import Image from 'components/Common/Image';
import BellSvg from 'assets/icons/BellSvg';
import UserInfoDropdown from './UserInfoDropdown';
import * as S from './GlobalNavigation.style';

// userInfo {id, profileImg, nickname}
LoginNav.propTypes = {
  userInfo: loggedUserType.isRequired,
};

export default function LoginNav({ userInfo }) {
  const { parent, isDropdownOpen, shouldCloseDropdown, openDropdown, closeDropdown } =
    useDropdown();
  const { nickname, profileImg } = userInfo;

  return (
    <S.BoardList>
      <Image src={LogoWithName} alt="메인 로고" customStyle={S.Logo} isAssets />
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
    </S.BoardList>
  );
}
