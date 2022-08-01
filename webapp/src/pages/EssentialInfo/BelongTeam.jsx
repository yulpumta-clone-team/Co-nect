import React from 'react';
import PropTypes from 'prop-types';
import { ESSENTIAL_INFO, SIGN_UP_INFO } from 'constant/route';
import { useNavigate } from 'react-router-dom';
import { categoryList } from 'constant';

BelongTeam.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  getFieldState: PropTypes.func.isRequired,
  formState: PropTypes.object.isRequired,
};

export default function BelongTeam({ register, errors, getFieldState, formState }) {
  const navigate = useNavigate();
  getFieldState('belongTeam', formState);
  const fieldState = getFieldState('belongTeam');
  const isButtonDisabled = fieldState.isDirty;
  const handleClickButton = (event) => {
    const { target } = event;
    if (isButtonDisabled) {
      target.disabled = false;
      navigate(ESSENTIAL_INFO + SIGN_UP_INFO.IMG_PORTFOLIO);
    }
  };
  return (
    <div>
      <p>팀 소속 여부를 선택해주세요</p>
      <select {...register('belongTeam')}>
        {categoryList.map(({ id, value, label }) => (
          <option key={id} value={value}>
            {label}
          </option>
        ))}
      </select>
      <span>{errors?.checkedList?.message}</span>
      <div>
        <button type="button" onClick={handleClickButton}>
          다음
        </button>
      </div>
    </div>
  );
}
