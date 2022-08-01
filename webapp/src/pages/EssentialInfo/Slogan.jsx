import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ESSENTIAL_INFO, SIGN_UP_INFO } from 'constant/route';

Slogan.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  getFieldState: PropTypes.func.isRequired,
  formState: PropTypes.object.isRequired,
};

export default function Slogan({ register, errors, getFieldState, formState }) {
  const navigate = useNavigate();
  getFieldState('slogan', formState);
  const fieldState = getFieldState('slogan');
  const isButtonDisabled = fieldState.isDirty;
  const handleClickButton = (event) => {
    const { target } = event;
    if (isButtonDisabled) {
      target.disabled = false;
      navigate(ESSENTIAL_INFO + SIGN_UP_INFO.SESSION_JOB);
    }
  };

  return (
    <div>
      <input
        {...register('slogan', {
          minLength: {
            value: 2,
            message: '슬로건을 입력해주세요',
          },
          required: true,
        })}
        placeholder="slogan"
      />
      <span>{errors?.slogan?.message}</span>
      <div>
        <button type="button" onClick={handleClickButton}>
          다음
        </button>
      </div>
    </div>
  );
}
