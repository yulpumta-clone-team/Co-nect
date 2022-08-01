import React, { useState } from 'react';
import { hopeSessionOption, jobOptions } from 'constant';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ESSENTIAL_INFO, SIGN_UP_INFO } from 'constant/route';

SessionJob.propTypes = {
  register: PropTypes.func.isRequired,
  getFieldState: PropTypes.func.isRequired,
  formState: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

export default function SessionJob({ register, errors, getFieldState, formState }) {
  const navigate = useNavigate();
  getFieldState('hopeSession', formState);
  getFieldState('userJob', formState);
  const [selectedHopeSession, setSelectedHopeSession] = useState([]);
  const [selectedJob, setSelectedJob] = useState([]);
  const handleClickButton = (event) => {
    const { target } = event;
    if (getFieldState('hopeSession').isDirty && getFieldState('userJob').isDirty) {
      target.disabled = false;
      navigate(ESSENTIAL_INFO + SIGN_UP_INFO.BELONG_TEAM);
    }
  };
  return (
    <div>
      <span>희망 작업 기간: {selectedHopeSession}</span>
      <select {...register('hopeSession')}>
        {hopeSessionOption.map(({ id, value, label }) => (
          <option key={id} value={value}>
            {label}
          </option>
        ))}
      </select>
      <span>{errors?.hopeSession?.message}</span>
      <span>선택한 직업: {selectedJob}</span>
      <select {...register('userJob')}>
        {jobOptions.map(({ id, value, label }) => (
          <option key={id} value={value}>
            {label}
          </option>
        ))}
      </select>
      <span>{errors?.selectedJob?.message}</span>
      <div>
        <button type="button" onClick={handleClickButton}>
          다음
        </button>
      </div>
    </div>
  );
}
