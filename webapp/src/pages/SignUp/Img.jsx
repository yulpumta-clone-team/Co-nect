import React from 'react';
import useInput from 'hooks/useInput';
import { NavLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

Img.propTypes = {
  userImg: PropTypes.string.isRequired,
  onImgChange: PropTypes.func.isRequired,
};

export default function Img({ userImg, onImgChange }) {
  const navigate = useNavigate();
  return (
    <div>
      <input
        value={userImg}
        name="profile-image"
        onChange={onImgChange}
        placeholder="임시 프로필 이미지 문자열로 입력"
      />{' '}
      <div>
        <NavLink to="/signup/session-job">다음</NavLink>
      </div>
    </div>
  );
}
