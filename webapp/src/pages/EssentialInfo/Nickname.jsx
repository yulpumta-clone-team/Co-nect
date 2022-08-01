import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ESSENTIAL_INFO, SIGN_UP_INFO } from 'constant/route';

Nickname.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  getFieldState: PropTypes.func.isRequired,
  formState: PropTypes.object.isRequired,
};

export default function Nickname({ register, errors, getFieldState, formState }) {
  const navigate = useNavigate();
  getFieldState('nickname', formState);
  const fieldState = getFieldState('nickname');
  const isButtonDisabled = fieldState.isDirty;
  const handleClickButton = (event) => {
    const { target } = event; // curretTarget
    if (isButtonDisabled) {
      // 조건이 만족하면 실행되는 부분
      target.disabled = false;
      navigate(ESSENTIAL_INFO + SIGN_UP_INFO.SKILL);
    }
  };

  return (
    <div>
      <input
        {...register('nickname', {
          minLength: {
            value: 2,
            message: '닉네임을 입력해주세요',
          },
          required: true,
        })}
        type="text"
        placeholder="nickname"
      />
      <span>{errors?.nickname?.message}</span>
      <div>
        <button type="button" onClick={handleClickButton}>
          다음
        </button>
      </div>
    </div>
  );
}
