/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import Menu from 'components/Menu';
import useModal from 'hooks/useModal';
import { removeLoginCookie } from 'utils/cookie';
import {
  HOME,
  MY_POST,
  NEW_POST,
  PROFILE,
  TEAM_BOARD,
  USERS_LIST,
  USER_BOARD,
} from 'constant/route';
import { DEFAULT_PROFILE_IMG } from 'constant';
import { Ul } from './style';

function LoginNav({ userInfo }) {
  const navigate = useNavigate();
  const { name, img } = userInfo;
  const image = (!img || img === 'string') && DEFAULT_PROFILE_IMG;
  const [showModal, onCloseModal, openModal] = useModal();
  const triggerLogOut = useCallback(() => {
    removeLoginCookie();
    navigate('/');
    window.location.reload();
  }, []);
  return (
    <Ul>
      <li>
        <Link to={HOME}>Main</Link>
      </li>
      <li>
        <Link to={USER_BOARD}>User Board</Link>
      </li>
      <li>
        <Link to={TEAM_BOARD}>Team Board</Link>
      </li>
      <li>
        <Link to={NEW_POST}>New Post</Link>
      </li>
      <li onClick={openModal}>
        <img style={{ width: '30px' }} src={image} alt="profile" />
        <span>{name}</span>
      </li>
      <Menu style={{ right: 0, top: 80 }} show={showModal} onCloseModal={onCloseModal}>
        <Ul IsflexDirectionColumn>
          <li>
            <Link to={MY_POST}>내 작성글</Link>
          </li>
          <li>
            <Link to={USERS_LIST}>내 관심글</Link>
          </li>
          <li>
            <Link to={PROFILE}>프로필 설정</Link>
          </li>
          <li>
            <button onClick={triggerLogOut}>로그아웃</button>
          </li>
        </Ul>
      </Menu>
    </Ul>
  );
}

LoginNav.propTypes = {
  userInfo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
  }).isRequired,
};

export default LoginNav;
