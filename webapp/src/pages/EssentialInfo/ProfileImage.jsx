import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ESSENTIAL_INFO, SIGN_UP_INFO } from 'constant/route';

ProfileImage.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  getFieldState: PropTypes.func.isRequired,
  formState: PropTypes.object.isRequired,
};

export default function ProfileImage({ register, errors, getFieldState, formState }) {
  const navigate = useNavigate();
  getFieldState('image', formState);
  const fieldState = getFieldState('image');
  const isButtonDisabled = fieldState.isDirty;
  const handleClickButton = (event) => {
    const { target } = event;
    if (isButtonDisabled) {
      target.disabled = false;
      navigate(ESSENTIAL_INFO + SIGN_UP_INFO.CONTENT);
    }
  };
  return (
    <div>
      <input
        type="file"
        {...register('image', {
          minLength: {
            value: 2,
            message: '프로필 이미지를 입력해주세요',
          },
          required: true,
        })}
        placeholder="profile-Img"
      />
      <span>{errors?.img?.message}</span>
      <input {...register('portfolio')} placeholder="portfolio" />
      <div>
        <button type="button" onClick={handleClickButton}>
          다음
        </button>
      </div>
    </div>
  );
}
