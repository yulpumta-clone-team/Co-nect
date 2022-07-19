import React from 'react';
import useInput from 'hooks/useInput';
import { NavLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

Img.propTypes = {
  register: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

export default function Img({ register, errors }) {
  const navigate = useNavigate();
  const [userImg, onImgChange] = useInput('');
  return (
    <div>
      <input
        {...register('img', {
          required: 'Img is required',
          pattern: {
            value: { userImg },
            message: '사진을 넣어주세요.',
          },
        })}
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
