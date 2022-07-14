import React from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import Menu from 'components/Menu';
import useModal from 'hooks/useModal';
import { HOME, MY_POST, NEW_POST, PROFILE, TEAM, MY_LIST, USER } from 'constant/route';
import { deleteUserInfo } from 'service/auth';
import { Ul } from './style';

LoginNav.propTypes = {
  userInfo: PropTypes.shape({
    userId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    profileImg: PropTypes.string.isRequired,
  }).isRequired,
};

export default function LoginNav({ userInfo }) {
  const navigate = useNavigate();
  const { name, profileImg } = userInfo;
  const [showModal, onCloseModal, openModal] = useModal();
  const triggerLogOut = () => {
    deleteUserInfo();
    navigate('/');
    window.location.reload();
  };
  return (
    <Ul>
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
      <li onClick={openModal}>
        <img style={{ width: '30px' }} src={profileImg} alt="profile" />
        <span>{name}</span>
      </li>
      <Menu style={{ right: 0, top: 80 }} show={showModal} onCloseModal={onCloseModal}>
        <Ul IsflexDirectionColumn>
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
        </Ul>
      </Menu>
    </Ul>
  );
}
