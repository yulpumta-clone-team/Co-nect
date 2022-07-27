import useInput from 'hooks/useInput';
import React from 'react';
import { hopeSessionOption } from 'constant';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ESSENTIAL_INFO, SIGN_UP, SIGN_UP_INFO } from 'constant/route';

SessionJob.propTypes = {
  hopeSession: PropTypes.string.isRequired,
  onHopeSessionChange: PropTypes.func.isRequired,
  userJob: PropTypes.string.isRequired,
  onJobChange: PropTypes.func.isRequired,
};

export default function SessionJob({ hopeSession, onHopeSessionChange, userJob, onJobChange }) {
  const navigate = useNavigate();
  return (
    <div>
      <span>희망 작업 기간</span>
      <select value={hopeSession} onChange={onHopeSessionChange}>
        {hopeSessionOption.map(({ id, value }) => (
          <option key={id} value={value}>
            {value}
          </option>
        ))}
      </select>
      <input value={userJob} onChange={onJobChange} placeholder="직업" />
      <div>
        <Link to={ESSENTIAL_INFO + SIGN_UP_INFO.SLOGAN_PORTFOLIO}>다음</Link>
      </div>
    </div>
  );
}
