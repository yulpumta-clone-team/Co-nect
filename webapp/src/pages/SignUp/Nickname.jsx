import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { SIGN_UP, SIGN_UP_INFO } from 'constant/route';

Nickname.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default function Nickname({ register, errors }) {
  const navigate = useNavigate();
  return (
    <div>
      <input
        {...register('nickname', {
          required: '2자리 이상 닉네임을 입력해주세요.',
          minLength: 2,
        })}
        placeholder="nickname"
      />
      <span>{errors?.nickname?.message}</span>
      <div>
        <Link to={SIGN_UP + SIGN_UP_INFO.SKILL}>다음</Link>
      </div>
    </div>
  );
}
