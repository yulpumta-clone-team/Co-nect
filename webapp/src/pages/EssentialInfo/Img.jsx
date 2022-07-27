import React from 'react';
import useInput from 'hooks/useInput';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ESSENTIAL_INFO, SIGN_UP, SIGN_UP_INFO } from 'constant/route';

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
        <Link to={ESSENTIAL_INFO + SIGN_UP_INFO.SESSION_JOB}>다음</Link>
      </div>
    </div>
  );
}
